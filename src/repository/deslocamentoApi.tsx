async function getClients() {
  const url = `https://api-deslocamento.herokuapp.com/api/v1/Cliente`;
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  return fetch(url, params);
}

async function getOneClient(id: number) {
  const url = `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`;
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  return fetch(url, params);
}

async function getOneConductor(id: number) {
  const url = `https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`;
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  return fetch(url, params);
}

async function getOneVehicle(id: number) {
  const url = `https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${id}`;
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  return fetch(url, params);
}

async function getConductors() {
  const url = `https://api-deslocamento.herokuapp.com/api/v1/Condutor`;
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  return fetch(url, params);
}

async function getVehicles() {
  const url = `https://api-deslocamento.herokuapp.com/api/v1/Veiculo`;
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  return fetch(url, params);
}

export {
  getConductors,
  getClients,
  getVehicles,
  getOneClient,
  getOneConductor,
  getOneVehicle,
};
