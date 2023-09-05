@echo off
for /f "usebackq tokens=1,2 delims==" %%G in (".env") do (
    set "%%G=%%H"
)
