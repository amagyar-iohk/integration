#!/bin/bash


# Make sure you have the previous report generated in the allure-report directory.

# Remove the allure-results directory.
rm -rf allure-results

# Run the tests.
npx jest

# Copy the allure-report/history subdirectory to allure-results/history.
cp -r allure-report/history allure-results/history

rm -rf allure-report

# Generate the new report.
npx allure generate allure-results
