// routes/index.js
const express = require('express');
const router = express.Router();
const db = require('../db');

redaksiError = 'Terjadi kesalahan pada server'

router.post('/borrow-books', async (req, res) => {
    const { member, book } = req.body;
    if(typeof member == '' || typeof book == ''){
        res.status(500).json({ error: redaksiError });
    }
    
    // Check apakah member atau bukan
    memberId =  "select member_id, EXTRACT(DAY FROM AGE(CURRENT_DATE, penalized_date)) AS days_since_penalized"
                +" from member where name = '" + member  + "'"
    const memberIdData = await db.query(memberId);
    if(memberIdData.rows.length == 0){
        res.status(500).json({ error: 'Member tidak ditemukan' });
    }
    // Validasi jika masih berada dalam area 3 hari masa penalti
    console.log(memberIdData.rows[0].days_since_penalized)
    if(memberIdData.rows[0].days_since_penalized < 4 && memberIdData.rows[0].days_since_penalized != null){
        res.status(500).json({ error: 'Member masih dalam masa penalti' });
    }

    // Cek apakah buku masih ada atau tidak
    bookId =    "select book_id from book where title = '" + book  + "'" 
                + " AND book_id NOT IN (select book_id from borrow where is_returned IS FALSE)"
    const bookIdData = await db.query(bookId);
    if(bookIdData.rows.length == 0){
        res.status(500).json({ error: 'Buku tidak ditemukan atau masih dalam peminjaman' });
    }

    try {
        sqlQuery = 'INSERT INTO borrow (member_id, book_id, borrowed_at , is_returned) VALUES'
                  + '(' + memberIdData.rows[0].member_id + ',' + bookIdData.rows[0].book_id + ',CURRENT_DATE, FALSE)'
        const result = await db.query(sqlQuery);
        res.status(201).json({ message: 'User created successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: redaksiError });
      }
});

router.post('/return-books', async (req, res) => {
    const { member, book } = req.body;

    // Check apakah member atau bukan
    memberId =  "select member_id"
                +" from member where name = '" + member  + "'"
    const memberIdData = await db.query(memberId);
    if(memberIdData.rows.length == 0){
        res.status(500).json({ error: 'Member tidak ditemukan' });
    }

    // Cek apakah buku adalah benar buku yang dipinjam oleh member
    bookId =    "select book_id from book where title = '" + book  + "'" 
                + " AND book_id IN (select book_id from borrow where member_id = "+  memberIdData.rows[0].member_id  +")"
    const bookIdData = await db.query(bookId);
    if(bookIdData.rows.length == 0){
        res.status(500).json({ error: 'Buku tidaklah pernah dipinjam oleh member atau buku tidak ditemukan' });
    }

    try {
        isPenalized = false
        dataBorrow =   "SELECT borrow_id, EXTRACT(DAY FROM AGE(CURRENT_DATE, borrowed_at)) AS time_borrow FROM borrow "
                        + " WHERE member_id = " + memberIdData.rows[0].member_id + " AND book_id = " + bookIdData.rows[0].book_id  + " AND is_returned IS FALSE"
        const dataBorrowQuery = await db.query(dataBorrow);
        if(dataBorrowQuery.rows[0].time_borrow > 7){
            //Berikan penalti pada member
            penalti = "UPDATE member SET penalized_date = CURRENT_DATE"
                    + " WHERE member_id = " + memberIdData.rows[0].member_id
            const resultPenalti = await db.query(penalti);
            isPenalized = true
        }
        sqlQuery = "UPDATE borrow SET is_returned = TRUE"
                    + " WHERE borrow_id = " + dataBorrowQuery.rows[0].borrow_id
        const result = await db.query(sqlQuery);
        redaksiPenalti = isPenalized ? ' Dikenakan Penalti karena keterlambatan' : ''
        redaksiTulisan = 'Books returned successfully. ' +  redaksiPenalti
        res.status(201).json({ message: redaksiTulisan });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: redaksiError });
      }

})


router.get('/check-book', async (req, res) => {
  try {
    sqlQuery =  'SELECT title, stock from book' 
                +' WHERE book_id NOT IN (select book_id from borrow)'
    const result = await db.query(sqlQuery);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: redaksiError });
  }
});

router.get('/check-member', async (req, res) => {
    try {
      sqlQuery = 'SELECT m.name, COUNT(b.borrow_id) AS borrow_count'
                + ' FROM member m'
                + ' LEFT JOIN borrow b ON b.member_id = m.member_id AND b.borrow_id IS NOT NULL'
                + ' GROUP BY m.name;'
      const result = await db.query(sqlQuery);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: redaksiError });
    }
  });

module.exports = router;
