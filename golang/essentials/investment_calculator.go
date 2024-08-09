package main

import (
	"fmt"
	"math"
)

const inflation = 1.5

func main() {
	var investAmt float64
	var expectedReturn = 4.70
	var years = 10.0
	outputText("Masukkan nilai investasi Anda: ")
	fmt.Scan(&investAmt) // pointer to put it into input

	outputText("Masukkan nilai tahun Anda: ")
	fmt.Scan(&years) // pointer to put it into input

	outputText("Masukkan nilai expected kembalian Anda: ")
	fmt.Scan(&expectedReturn) // pointer to put it into input

	futureVal, futureValWithInflation := calculateFutureVal(investAmt, expectedReturn, years)
	fmt.Print(futureVal, futureValWithInflation)
}

func outputText(text1 string) {
	fmt.Print(text1)
}

func calculateFutureVal(investAmt, expectedReturn, years float64) (float64, float64) {
	future_val := (investAmt) * math.Pow((1+expectedReturn/100), (years))
	return_future_val := future_val / math.Pow(1+inflation/100, years)
	return future_val, return_future_val
}
