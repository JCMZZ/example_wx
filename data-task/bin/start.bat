@echo off & setlocal enabledelayedexpansion
set LIB_JARS=""
cd lib
for %%i in (*) do set LIB_JARS=!LIB_JARS!;lib\%%i
cd ..
java -server -Xms64m -Xmx1024m -XX:MaxPermSize=64M -classpath conf;%LIB_JARS% cn.emay.estore.main.StartEstoreDataTaskServer
pause