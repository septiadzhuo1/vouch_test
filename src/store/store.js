const state={
    name:"",
    RoomID:""

};
const getters={
    getbasicData:(state) => {
        console.log(state)
        return state;
    }
};
const actions={};
const mutations={
    assignData(state, payload){
        state.name=payload.name
        state.RoomID = payload.roomID
    },
    emptyData(state){
        state.name=""
        state.RoomID = ""
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}