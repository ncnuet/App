interface IParcelSchema {
    pid: String;
    goods: {
        name: String,
        quantity: Number,
        weight: Number,
        value: Number,
        attach_papers: String,
    }

}