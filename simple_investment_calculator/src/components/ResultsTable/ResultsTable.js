import React from "react"
import styles from './ResultsTable.module.css';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const ResultsTable = (props) => {
    return (
        <table className={styles.result}>
            <thead>
            <tr>
                <th>Year</th>
                <th>Total Savings</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
            </tr>
            </thead>
            <tbody>
                {props.data.map((yearData, index) => (
                    <tr key={index}>
                        <td>{yearData.year}</td>
                        <td>{formatter.format(yearData.savingsEndOfYear)}</td>
                        <td>{formatter.format(yearData.yearlyInterest)}</td>
                        <td>{formatter.format(yearData.savingsEndOfYear - props.initialInvestment - yearData.yearlyContribution * yearData.year)}</td>
                        <td>{formatter.format(props.initialInvestment + yearData.yearlyContribution * yearData.year)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ResultsTable;