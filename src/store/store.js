const state={
    name:"",
    RoomID:""

};
const getters={};
const actions={};
const mutations={
    assignData(state, payload){
        state.name=payload.name
        state.RoomID = payload.roomID
    }

};

export default {
    state,
    getters,
    actions,
    mutations
}