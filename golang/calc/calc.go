package main

import (
	"errors"
	"fmt"
	"os"
)

func main() {

	revenue, err1 := getUserInput("Revenue :")
	expenses, err2 := getUserInput("Expenses :")
	taxRate, err3 := getUserInput("Tax Rate :")
	if err1 != nil || err2 != nil || err3 != nil {
		var caption error
		if err1 != nil {
			caption = err1
		} else if err2 != nil {
			caption = err2
		} else if err3 != nil {
			caption = err3
		}
		fmt.Println(caption)
		return
	}

	ebt, profit, ratio := calculateFinance(revenue, expenses, taxRate)

	fmt.Printf("%.1f \n", ebt)
	fmt.Printf("%.1f \n", profit)
	fmt.Printf("%.1f \n", ratio)
	storeResults(ebt, profit, ratio)
}

func getUserInput(infoText string) (float64, error) {
	var userInput float64
	fmt.Print(infoText)
	fmt.Scan(&userInput)
	if userInput <= 0 {
		return 0, errors.New("Value must be positive num")
	}
	return userInput, nil
}

func calculateFinance(revenue, expenses, taxRate float64) (float64, float64, float64) {
	ebt := revenue - expenses
	profit := ebt * (1 - taxRate/100)
	ratio := ebt / profit
	return ebt, profit, ratio
}

func storeResults(ebt, profit, ratio float64) {
	results := fmt.Sprintf("EBT: %.1f\nProfit: %.1f\nRatio: %.3f\n", ebt, profit, ratio)
	os.WriteFile("results.txt", []byte(results), 0644)
}
