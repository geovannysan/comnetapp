git add .
for /f "delims=" %%a in ('wmic OS Get localdatetime ^| find "."') do set datetime=%%a
set year=%datetime:~0,4%
set month=%datetime:~4,2%
set day=%datetime:~6,2%
set hour=%datetime:~8,2%
set minute=%datetime:~10,2%
set second=%datetime:~12,2%
set formatted_date=%year%-%month%-%day%_%hour%:%minute%:%second%

git commit -m "%formatted_date%"
git push origin main --force
#crear numero randon

SET var1=%RANDOM% 


docker build -t djmarret1992/tickes-reactpagos:2.%var1% -f Dockerfile .
docker login -u "djmarret1992" -p "Tumadre1@" docker.io
docker tag djmarret1992/tickes-reactpagos:2.%var1% djmarret1992/tickes-reactpagos:latest
docker push djmarret1992/tickes-reactpagos:2.%var1%
docker push djmarret1992/tickes-reactpagos:latest