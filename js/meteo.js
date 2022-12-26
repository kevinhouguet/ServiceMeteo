const meteoModule = {
  getData: async function (longitude,lattitude){
    const query = `https://www.7timer.info/bin/astro.php?lon=${longitude}&lat=${lattitude}&ac=0&unit=metric&output=json&tzshift=1`
    
    try {
      const httpResponse = await fetch(query);
      const data = await httpResponse.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}