A EMPLOYEE CASE 
SOAL NO 1

SELECT 
REGION_ID,
STRING_AGG(EMP_ID.FIRST_NAME || ' ' || EMP_ID.LAST_NAME, ', ') AS NAMA_PEGAWAI
FROM 
EMPLOYEE_ID AS EMP_ID
LEFT JOIN 
DEPARTEMENT_ID AS DEP_ID ON DEP_ID.DEPARTEMENT_ID = EMP_ID.DEPARTEMENT_ID
LEFT JOIN 
LOCATION_ID AS LOC_ID ON LOC_ID.DEPARTEMENT_ID = DEP_ID.DEPARTEMENT_ID -- ASUMSI LOCATION ADA DEPARTEMENT_ID NYA
LEFT JOIN 
COUNTRY ON LOC_ID.COUNTRY_ID = COUNTRY.COUNTRY_ID
GROUP BY 
REGION_ID;

SOAL NO 2
SELECT JOB_TITLE, MAX_SALARY
FROM JOB_ID
ORDER BY MAX_SALARY DESC
LIMIT 1
-- ASUMSI MAX SALARY MENENTUKAN SALARY TERTINGGI

SOAL NO 3
SELECT 
    EMP_ID.FIRST_NAME,
    EMP_ID.LAST_NAME,
    DEP_ID.DEPARTEMENT_NAME, -- ASUMSI INI ADA DI DEPARTEMENT_ID
    LOC_ID.CITY,
    LOC_ID.POSTAL_CODE,
    COUNTRY.COUNTRY_NAME
FROM 
EMPLOYEE_ID AS EMP_ID
LEFT JOIN 
DEPARTEMENT_ID AS DEP_ID ON DEP_ID.DEPARTEMENT_ID = EMP_ID.DEPARTEMENT_ID
LEFT JOIN 
LOCATION_ID AS LOC_ID ON LOC_ID.DEPARTEMENT_ID = DEP_ID.DEPARTEMENT_ID -- ASUMSI LOCATION ADA DEPARTEMENT_ID NYA
LEFT JOIN 
COUNTRY ON LOC_ID.COUNTRY_ID = COUNTRY.COUNTRY_ID

CREATE OR REPLACE FUNCTION get_employee_details(nama TEXT)
RETURNS TABLE (
    first_name TEXT,
    last_name TEXT,
    manager_name TEXT,
    manager_job_title TEXT,
    manager_department TEXT,
    employee_job_title TEXT,
    job_start_date DATE,
    job_end_date DATE,
    job_department TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        EMP_ID.FIRST_NAME, 
        EMP_ID.LAST_NAME, 
        MGR.FIRST_NAME || ' ' || MGR.LAST_NAME AS MANAGER_NAME, 
        MGR.JOB_TITLE AS MANAGER_JOB_TITLE, 
        MGR.DEPARTEMENT_NAME AS MANAGER_DEPARTMENT, 
        JOB_HIS.JOB_TITLE AS EMPLOYEE_JOB_TITLE, 
        JOB_HIS.START_DATE AS JOB_START_DATE,
        JOB_HIS.END_DATE AS JOB_END_DATE,
        JOB_HIS.DEPARTEMENT_NAME AS JOB_DEPARTMENT
    FROM 
        EMPLOYEE_ID AS EMP_ID
    LEFT JOIN 
        (
            SELECT   
                EMP_MGR_ID.EMPLOYEE_ID,
                EMP_MGR_ID.FIRST_NAME, 
                EMP_MGR_ID.LAST_NAME,
                JOB_MGR_ID.JOB_TITLE,
                DEP_MGR_ID.DEPARTEMENT_NAME
            FROM 
                EMPLOYEE_ID AS EMP_MGR_ID
            LEFT JOIN 
                DEPARTEMENT_ID AS DEP_MGR_ID ON DEP_MGR_ID.DEPARTEMENT_ID = EMP_MGR_ID.DEPARTEMENT_ID
            LEFT JOIN 
                JOB_ID AS JOB_MGR_ID ON JOB_MGR_ID.JOB_ID = EMP_MGR_ID.JOB_ID
        ) AS MGR ON EMP_ID.MANAGER_ID = MGR.EMPLOYEE_ID
    LEFT JOIN 
        (
            SELECT
                JOB_HIST.EMPLOYEE_ID,
                JOB_ID_TITLE.JOB_TITLE, 
                JOB_HIST.START_DATE,
                JOB_HIST.END_DATE,
                DEP_ID.DEPARTEMENT_NAME
            FROM 
                JOB_HISTORY AS JOB_HIST
            LEFT JOIN 
                DEPARTEMENT_ID AS DEP_ID ON DEP_ID.DEPARTEMENT_ID = JOB_HIST.DEPARTEMENT_ID
            LEFT JOIN 
                JOB_ID AS JOB_ID_TITLE ON JOB_ID_TITLE.JOB_ID = JOB_HIST.JOB_ID
        ) AS JOB_HIS ON EMP_ID.EMPLOYEE_ID = JOB_HIS.EMPLOYEE_ID
    WHERE 
        EMP_ID.FIRST_NAME || ' ' || EMP_ID.LAST_NAME = nama;
END;
$$ LANGUAGE plpgsql;


B. BUS CASE
soal no 1
SELECT 
    COSTUM_ID.COSTUMER_ID,  
    COSTUM_ID.NAME,
    ADDR.ADDRESS1 || ' ' || ADDR.ADDRESS2 || ' ' || ADDR.ADDRESS3  || ' ' || ADDR.ADDRESS4  || ' ' || ADDR.ADDRESS5 ASS FULL_ADDRESS,
    COSTUM_ID.PHONE_NUMBER
    FROM COSTUMER COSTUM_ID
    LEFT JOIN
        ADDRESS ADDR
            ON COSTUM_ID.COSTUMER_ID = ADDRESS.COSTUMER_ID
    LEFT JOIN
        TRANSHEADER THEAD -- ASUMSI TABEL INI ADALAH MAIN TABLE TRANSAKSI UNTUK TRANSAKSI PULANG PERGI BUS
            ON THEAD.COSTUMER_ID = COSTUM_ID.COSTUMER_ID
    WHERE THEAD.STATUS = 4 -- STATUS NOT CONFIRM ATAU MUNGKIN ASUMSI SAYA TIDAK JELAS AKAN BERANGKAT

soal no 2
SELECT 
    COSTUM_ID.COSTUMER_ID,  
    COSTUM_ID.NAME,
    FROM COSTUMER COSTUM_ID
    LEFT JOIN
        TRANSHEADER THEAD -- ASUMSI TABEL INI ADALAH MAIN TABLE TRANSAKSI UNTUK TRANSAKSI PULANG PERGI BUS
            ON THEAD.COSTUMER_ID = COSTUM_ID.COSTUMER_ID
    LEFT JOIN 
        ALLOCATION ALC 
            ON THEAD.TRANSHEADER_ID = ALC.TRANSHEADER_ID
    WHERE THEAD.STATUS = 5 -- STATUS NOT CONFIRM ATAU MUNGKIN ASUMSI SAYA TIDAK JELAS AKAN BERANGKAT
        AND BUS_ID IS NULL

soal no 3
SELECT 
    COSTUM_ID.NAME,
    THEAD.QTY,
    ADDR.ADDRESS1 || ' ' || ADDR.ADDRESS2 || ' ' || ADDR.ADDRESS3  || ' ' || ADDR.ADDRESS4  || ' ' || ADDR.ADDRESS5 ASS FULL_ADDRESS,
    COSTUM_ID.PHONE_NUMBER,
    CONTACT.NAME,
    BUS.CHAIR_TYPE AS NAMA_KURSI -- ASUMSI SAYA NAMA KURSI ADALAH CHAIR_TYPE

    FROM COSTUMER COSTUM_ID
     LEFT JOIN
        ADDRESS ADDR
            ON COSTUM_ID.COSTUMER_ID = ADDRESS.COSTUMER_ID
     LEFT JOIN
         CONTACT
            ON COSTUM_ID.COSTUMER_ID = CONTACT.COSTUMER_ID
    LEFT JOIN
        TRANSHEADER THEAD -- ASUMSI TABEL INI ADALAH MAIN TABLE TRANSAKSI UNTUK TRANSAKSI PULANG PERGI BUS
            ON THEAD.COSTUMER_ID = COSTUM_ID.COSTUMER_ID
    LEFT JOIN 
        ALLOCATION ALC 
            ON THEAD.TRANSHEADER_ID = ALC.TRANSHEADER_ID
    LEFT JOIN
        BUS 
            ON ALC.BUS_ID = BUS.BUS_ID
    LEFT JOIN
        DESTINATIONTOWN  AS DEST
            ON DEST.DESTINATIONTOWN_ID = THEAD.DESTINATIONTOWN_ID
    WHERE BUS.KODE_BUS = '39'
    AND DESTINATIONNAME = 'Jogjakarta'
    ORDER BY NO_KURSI ASC

Soal no 4
CREATE OR REPLACE PROCEDURE get_bus_details(kode_bus_param TEXT)
LANGUAGE SQL
AS $$
    SELECT 
        BUS.KODE_BUS,
        BUS.PLAT,
        BUS.NAMA,
        BUS.QTY,
        BUSCOUNT.QTYTERISI,
        DEST.DESTINATIONNAME,
        COSTUM_ID.NAME AS CUSTOMER_NAME,
        THEAD.TRANS_DTM,
        ADDR.ADDRESS1 || ' ' || ADDR.ADDRESS2 || ' ' || ADDR.ADDRESS3 || ' ' || ADDR.ADDRESS4 || ' ' || ADDR.ADDRESS5 AS FULL_ADDRESS,
        CONTACT.NAME AS CONTACT_NAME,
        ALC.NO_KURSI,
        JOB.NAME AS INPUTER
    FROM 
        BUS
    LEFT JOIN 
        (SELECT 
            BUS1.QTY - COUNT(ALC1.*) AS QTYTERISI, 
            BUS1.BUS_ID
        FROM 
            BUS AS BUS1
        LEFT JOIN 
            ALLOCATION ALC1 ON ALC1.BUS_ID = BUS1.BUS_ID
        LEFT JOIN 
            TRANSHEADER THEAD1 ON THEAD1.TRANSHEADER_ID = ALC1.TRANSHEADER_ID 
        GROUP BY 
            BUS1.QTY, BUS1.BUS_ID
        ) AS BUSCOUNT ON BUS.BUS_ID = BUSCOUNT.BUS_ID
    LEFT JOIN 
        ALLOCATION ALC ON ALC.BUS_ID = BUS.BUS_ID
    LEFT JOIN 
        TRANSHEADER THEAD ON THEAD.TRANSHEADER_ID = ALC.TRANSHEADER_ID
    LEFT JOIN 
        CUSTOMER COSTUM_ID ON THEAD.CUSTOMER_ID = COSTUM_ID.CUSTOMER_ID
    LEFT JOIN 
        DESTINATIONTOWN DEST ON THEAD.DESTINATIONTOWN_ID = DEST.DESTINATIONTOWN_ID
    LEFT JOIN 
        ADDRESS ADDR ON COSTUM_ID.CUSTOMER_ID = ADDR.CUSTOMER_ID
    LEFT JOIN 
        CONTACT ON COSTUM_ID.CUSTOMER_ID = CONTACT.CUSTOMER_ID
    LEFT JOIN 
        SHUTTLE ON SHUTTLE.DEPARTURE_ID = THEAD.DEPARTURE_ID
    LEFT JOIN 
        JOB ON SHUTTLE.SHUTTLE_ID = JOB.SHUTTLE_ID
    WHERE 
        BUS.KODE_BUS = kode_bus_param;
$$;










