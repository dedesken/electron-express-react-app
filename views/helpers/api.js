import Axios from 'axios';

const Api = {
    getAllCars: () => Axios.get('/cars'),
    getCarModels: ({id}) => Axios.get(`/cars/models/${id}`),
    getAllProds: () => Axios.get('/parts'),
    getAllAutoNodes: () => Axios.get('/parts/nodes'),
    getNodeGroups: ({id}) => Axios.get(`/parts/nodes/${id}`),
    getParts: ({id}) => Axios.get(`/parts/${id}`),
    
    saveFiles: (rows) => Axios.post('/', {rows}), 

    addCar: (name) => Axios.post('/cars', {name}),
    addCarModel: (name, {id}) => Axios.post(`/cars/models/${id}`, {name}),
    addProd: (name) => Axios.post(`/parts`, {name}),
    addAutoNode: (name) => Axios.post(`/parts/nodes`, {name}),
    addNodeGroup: (name, {id}) => Axios.post(`/parts/nodes/${id}`, {name}),
    addAutoPart: (name, {id}) => Axios.post(`/parts/add/${id}`, {name})
};

export default Api;
