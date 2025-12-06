@echo off
REM ================================================
REM Script de Smoke Test pour Windows
REM Usage: smoke-test.bat <container_name> <port>
REM ================================================

SET CONTAINER_NAME=%1
SET PORT=%2

IF "%CONTAINER_NAME%"=="" SET CONTAINER_NAME=booking-app
IF "%PORT%"=="" SET PORT=8082

echo =========================================
echo SMOKE TEST SUITE
echo =========================================
echo Container: %CONTAINER_NAME%
echo Port: %PORT%
echo =========================================
echo.

SET PASSED=0
SET FAILED=0
SET TOTAL=0

REM Test 1: Container is running
SET /A TOTAL+=1
echo Test %TOTAL%: Container Running
docker ps | findstr %CONTAINER_NAME% >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    echo [PASSED] Container is running
    SET /A PASSED+=1
) ELSE (
    echo [FAILED] Container is not running
    SET /A FAILED+=1
)

REM Test 2: HTTP Response
SET /A TOTAL+=1
echo Test %TOTAL%: HTTP Response
curl -f http://localhost:%PORT% >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    echo [PASSED] HTTP endpoint responds
    SET /A PASSED+=1
) ELSE (
    echo [FAILED] HTTP endpoint does not respond
    SET /A FAILED+=1
)

REM Test 3: Container Health
SET /A TOTAL+=1
echo Test %TOTAL%: Container Health
docker inspect %CONTAINER_NAME% --format="{{.State.Status}}" | findstr running >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    echo [PASSED] Container is healthy
    SET /A PASSED+=1
) ELSE (
    echo [FAILED] Container is not healthy
    SET /A FAILED+=1
)

REM Results
echo.
echo =========================================
echo TEST SUMMARY
echo =========================================
echo Total Tests: %TOTAL%
echo Passed: %PASSED%
echo Failed: %FAILED%
echo =========================================

IF %FAILED% GTR 0 (
    echo [FAILED] Some tests failed
    exit /b 1
) ELSE (
    echo [SUCCESS] All tests passed
    exit /b 1
)
 "test: force failure"
