export const contactStore = {
  listaContactos: [
    {
      full_name: "Dave Bradley",
      email: "dave@gmail.com",
      agenda_slug: "agenda_de_sandra",
      address: "47568 NW 34ST, 33434 FL, USA",
      phone: "7864445566",
    },
  ],
};

export function contactActions(getStore, getActions, setStore) {
  return {
    funcionCarga: async () => {
      let store = getStore();
      let actions = getActions();
      let { respuestaJson, response } = await actions.useFetch(
        "/apis/fake/contact/agenda/agenda_de_sandra",
        null
      );
      setStore({ ...store, listaContactos: respuestaJson });
    },

    addContact: async (obj) => {
      let store = getStore();
      let arrTemp = store.listaContactos.slice();

      arrTemp.push(obj);
      setStore({ ...store, listaContactos: arrTemp });

      return store.listaContactos;
    },
    deleteContact: (id) => {
      let actions = getActions();
      actions.deleteFetch(id);
    },

    editContact: (indice, nombre, email, telefono, direccion) => {
      let store = getStore();
      let arrTemp = store.listaContactos.slice();

      arrTemp[indice]["full_name"] = nombre;
      arrTemp[indice]["email"] = email;
      arrTemp[indice]["phone"] = telefono;
      arrTemp[indice]["address"] = direccion;

      setStore({ ...store, listaContactos: arrTemp });
    },

    getFetch: async (endpoint) => {
      let url = "https://assets.breatheco.de/apis/fake/contact/" + endpoint;
      let response = await fetch(url);

      let respuestaJson = await response.json();
      return { respuestaJson, response };
    },

    putFetch: async (endpoint, body) => {
      let actions = getActions();
      let url = "https://assets.breatheco.de/apis/fake/contact/" + endpoint;
      let response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });

      if (response.ok) {
        let respuestaJson = await response.json();
        actions.funcionCarga();
        return { respuestaJson, response };
      }

      return null;
    },

    deleteFetch: async (endpoint) => {
      let actions = getActions();
      let url = "https://assets.breatheco.de/apis/fake/contact/" + endpoint;
      let response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        let respuestaJson = await response.json();
        actions.funcionCarga();
        return { respuestaJson, response };
      }

      return null;
    },

    peticionEjemplo: async () => {
      let suma = 4;
      /* fetch("https://assets.breatheco.de/apis/fake/contact/agenda")
                .then((promesa) => promesa.json() //puede tomar tiempo
                )
                .then((data1) => {
                    console.log("response", data1)
                    //return response
                }).catch((error) => {
                    console.log(error)
                }) */

      //2do método async-await en cascada
      let respuesta = await fetch("https://assets.breatheco.de/apis/fake/contact/agenda");

      if (respuesta.ok) {
        let respuestaJSON = await respuesta.json(); //proceso puede tomar tiempo
      }
      //let respuesta2 = await fetch("https://assets.breatheco.de/apis/fake/contact/agenda")
      //respuesta recibe una promesa
      //console.log(respuesta.ok, respuesta.status)

      //recibiendo respuestas en paralelo
      /* let respuesta = fetch("https://assets.breatheco.de/apis/fake/contact/agenda")
            let respuesta2 = fetch("https://assets.breatheco.de/apis/fake/contact/agenda")
            let [a, b] = await Promise.all([respuesta, respuesta2]) //llegan en formato de promesa al mismo tiempo

            let respuestaJSON = await a.json()  //pueden tomar tiempo
            let respuestaJSON2 = await b.json() //pueden tomar tiempo
            console.log(respuestaJSON)
 */
    },
    fetchPost: async () => {
      //2do método async-await en cascada
      let respuesta = await fetch(
        "https://assets.breatheco.de/apis/fake/contact/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: "David",
            email: "david11@gmail.com",
            agenda_slug: "agenda_de_sandra",
            address: "47568 NW 34ST, 33434 FL, USA",
            phone: "7864445566",
          }),
        }
      );

      /* if (!respuesta.ok) {
                //cualquier cosa aquí
                return
            } */

      let respuestaJSON = await respuesta.json();
    },
  };
}
