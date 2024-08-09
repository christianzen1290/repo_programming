package main

import (
	"errors"
	"fmt"
	"os"
	"strconv"
)

const accountBalanceFile = "balance.txt"

func getBalanceFromFile() (float64, error) {
	data, err := os.ReadFile(accountBalanceFile)
	if err != nil {
		return 1000.0, errors.New("Failed to read file")
	}
	balanceText := string(data)
	balance, err := strconv.ParseFloat(balanceText, 64)
	if err != nil {
		return 1000.0, errors.New("Failed to parse balance file")
	}
	return balance, nil
}

func writeBalanceToFile(balance float64) {
	balanceText := fmt.Sprint(balance)
	os.WriteFile(accountBalanceFile, []byte(balanceText), 0644)
}
func main() {
	var choice int
	var depositAmt float64
	var withdrawAmt float64
	accountBalance, err := getBalanceFromFile()

	if err != nil {
		fmt.Println("Error")
		fmt.Println(err)
		panic(err)
	}
	fmt.Println("Welcome to Go Bank")

	for {
		Choose()
		fmt.Println("Your Choice :")
		fmt.Scan(&choice)
		fmt.Println("Your Choice :", choice)
		if choice == 1 {
			fmt.Printf("%.1f", accountBalance)
			println("")
		} else if choice == 2 {
			fmt.Print("Your Deposit : ")
			fmt.Scan(&depositAmt)
			if depositAmt <= 0 {
				fmt.Println("Invalid amount. Must be greater than 0")
				continue
			}
			accountBalance += depositAmt
			fmt.Println("Balance Updated. New Amt : ", accountBalance)
			writeBalanceToFile(accountBalance)
		} else if choice == 3 {
			fmt.Print("Your Withdraw : ")
			fmt.Scan(&withdrawAmt)
			accountBalance -= withdrawAmt
			fmt.Println("Balance Updated. New Amt : ", accountBalance)
			writeBalanceToFile(accountBalance)
		} else {
			fmt.Println("Good Bye")
			return
		}
	}
}

func Choose() {
	fmt.Println("What do you want to do?")
	fmt.Println("1. Check Balance")
	fmt.Println("2. Deposit Money")
	fmt.Println("3. Withdraw Money")
	fmt.Println("4. Exit")
}
