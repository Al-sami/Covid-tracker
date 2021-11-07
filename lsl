warning: LF will be replaced by CRLF in public/index.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/App.js.
The file will have its original line endings in your working directory
[1mdiff --git a/public/index.html b/public/index.html[m
[1mindex adb14cb..53ea3f4 100644[m
[1m--- a/public/index.html[m
[1m+++ b/public/index.html[m
[36m@@ -3,8 +3,7 @@[m
   <head>[m
     <meta charset="utf-8" />[m
     <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />[m
[31m-[m
[31m-    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />[m
[32m+[m[32m    <link rel="stylesheet" href="./Hello.css">[m
     <meta name="viewport" content="width=device-width, initial-scale=1" />[m
     <meta name="theme-color" content="#000000" />[m
     <meta[m
[36m@@ -16,8 +15,8 @@[m
     <title>Covid-19 tracker</title>[m
   </head>[m
   <body>[m
[31m-    <noscript>You need to enable JavaScript to run this app.</noscript>[m
[31m-    <div id="root"></div>[m
[32m+[m[41m    [m
[32m+[m[32m    <div class="sami" id="root"></div>[m
     [m
   </body>[m
 </html>[m
[1mdiff --git a/src/App.js b/src/App.js[m
[1mindex 13c549e..253457f 100644[m
[1m--- a/src/App.js[m
[1m+++ b/src/App.js[m
[36m@@ -13,6 +13,17 @@[m [mimport "./App.css";[m
 function App() {[m
   const [countries, setCountries] = useState([]);[m
   const [countryClicked, setCountryClicked] = useState("worldwide");[m
[32m+[m[32m  const [countryInfo, setCountryInfo] = useState({});[m
[32m+[m
[32m+[m[32m  useEffect(() => {[m
[32m+[m[32m    fetch("https://disease.sh/v3/covid-19/all")[m
[32m+[m[32m      .then((response) => {[m
[32m+[m[32m        return response.json();[m
[32m+[m[32m      })[m
[32m+[m[32m      .then((data) => {[m
[32m+[m[32m        setCountryInfo(data);[m
[32m+[m[32m      });[m
[32m+[m[32m  }, []);[m
 [m
   useEffect(() => {[m
     const getCountriesInfo = async () =>[m
[36m@@ -30,10 +41,25 @@[m [mfunction App() {[m
     getCountriesInfo();[m
   }, []);[m
 [m
[31m-  function handleCountryChange(event) {[m
[32m+[m[32m  async function handleCountryChange(event) {[m
     const newCountry = event.target.value;[m
[31m-    console.log(newCountry);[m
[31m-    setCountryClicked(newCountry);[m
[32m+[m
[32m+[m[32m    const url =[m
[32m+[m[32m      newCountry === "worldwide"[m
[32m+[m[32m        ? "https://disease.sh/v3/covid-19/all"[m
[32m+[m[32m        : `https://disease.sh/v3/covid-19/countries/${newCountry}`;[m
[32m+[m
[32m+[m[32m    await fetch(url)[m
[32m+[m[32m      .then((response) => {[m
[32m+[m[32m        return response.json();[m
[32m+[m[32m      })[m
[32m+[m[32m      .then((data) => {[m
[32m+[m[32m        setCountryClicked(newCountry);[m
[32m+[m[32m        setCountryInfo(data);[m
[32m+[m[32m      });[m
[32m+[m
[32m+[m[32m    //  if worldwide then link https://disease.sh/v3/covid-19/all[m
[32m+[m[32m    // else if any country https://disease.sh/v3/covid-19/countries/{country}[m
   }[m
 [m
   return ([m
[36m@@ -43,11 +69,7 @@[m [mfunction App() {[m
           <h1>Covid-19 Tracker</h1>[m
 [m
           <FormControl className="app_dropdown">[m
[31m-            <Select[m
[31m-              value={countryClicked}[m
[31m-              variant="outlined"[m
[31m-              onChange={handleCountryChange}[m
[31m-            >[m
[32m+[m[32m            <Select value={countryClicked} onChange={handleCountryChange}>[m
               <MenuItem value="worldwide">Worldwide</MenuItem>[m
               {countries.map((country) => ([m
                 <MenuItem value={country.value}>{country.name}</MenuItem>[m
[36m@@ -56,9 +78,21 @@[m [mfunction App() {[m
           </FormControl>[m
         </div>[m
         <div className="app_stats">[m
[31m-          <InfoBox title="Coronavirus Cases" cases="123" total="2000" />[m
[31m-          <InfoBox title="Recovered" cases="123" total="2002" />[m
[31m-          <InfoBox title="Deaths" cases="1234" total="2001" />[m
[32m+[m[32m          <InfoBox[m
[32m+[m[32m            title="Coronavirus Cases"[m
[32m+[m[32m            cases={countryInfo.todayCases}[m
[32m+[m[32m            total={countryInfo.cases}[m
[32m+[m[32m          />[m
[32m+[m[32m          <InfoBox[m
[32m+[m[32m            title="Recovered"[m
[32m+[m[32m            cases={countryInfo.todayRecovered}[m
[32m+[m[32m            total={countryInfo.recovered}[m
[32m+[m[32m          />[m
[32m+[m[32m          <InfoBox[m
[32m+[m[32m            title="Deaths"[m
[32m+[m[32m            cases={countryInfo.todayDeaths}[m
[32m+[m[32m            total={countryInfo.deaths}[m
[32m+[m[32m          />[m
         </div>[m
         <Map />[m
       </div>[m
