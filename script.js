// Objeto que agrupa toda la lógica relacionada con la planta
const plantLightChecker = {
  // Horas mínimas de luz que la planta necesita
  lightThreshold: 6,

  /*  
     Método que simula revisar cuántas horas de luz tuvo la planta.
     Devuelve una Promesa porque la operación podría ser asíncrona
     (por ejemplo, leer de un sensor, consultar una API, etc.)
  */
  checkLight: function (hours) {
    return new Promise((resolve, reject) => {

      // Simulamos una operación que tarda tiempo, usando setTimeout
      setTimeout(() => {
        /*  
           Si la planta tiene menos horas de luz que el umbral,
           consideramos que "sí necesita más luz" → promesa resuelta.
        */
        if (hours < this.lightThreshold) {
          resolve(
            `La planta solo tuvo ${hours}h de luz. Necesita más luz.`
          );
        } else {
          /*  
             Si ya tuvo suficientes horas, entonces no necesita más luz.
             Esto se comunica rechazando la promesa.
          */
          reject(
            `La planta ya tuvo ${hours}h de luz. No necesita más.`
          );
        }
      }, 1000); // <- 1 segundo de simulación de espera
    });
  },
};

/*  
   Función asíncrona que consume la Promesa usando async/await.
   Aquí es donde "usamos" la lógica del objeto plantLightChecker.
*/
async function evaluatePlant(hours) {
  console.log("Revisando la planta...");

  try {
    // Espera a que la promesa se resuelva
    const message = await plantLightChecker.checkLight(hours);
    console.log("✔️ RESUELTA:", message);
  } catch (errorMessage) {
    // Captura el rechazo de la promesa
    console.log("❌ RECHAZADA:", errorMessage);
  }
}

// Ejemplo de uso
evaluatePlant(3);  // → debería resolverse
evaluatePlant(8);  // → debería rechazarse