@REM Maven wrapper bootstrap for Windows.
@echo off
setlocal
set BASE_DIR=%~dp0
set MAVEN_PROJECTBASEDIR=%BASE_DIR:~0,-1%
set WRAPPER_JAR=%BASE_DIR%.mvn\wrapper\maven-wrapper.jar
set WRAPPER_PROPS=%BASE_DIR%.mvn\wrapper\maven-wrapper.properties
if exist "%WRAPPER_JAR%" goto run
powershell -NoProfile -ExecutionPolicy Bypass -Command "$p='%WRAPPER_PROPS%';$u=(Select-String -Path $p -Pattern '^wrapperUrl=').Line.Split('=',2)[1];Invoke-WebRequest -Uri $u -OutFile '%WRAPPER_JAR%'"
:run
java "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" -cp "%WRAPPER_JAR%" org.apache.maven.wrapper.MavenWrapperMain %*
endlocal
