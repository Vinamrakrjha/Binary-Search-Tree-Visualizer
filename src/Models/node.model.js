class Nodemodel{
    constructor(key, value){
        this.value = value;
        this.key = key;
        this.left =null;
        this.right= null;
    }

    getleftnode(){
        return this.left;
    }

    getrightnode(){
        return this.right;
    }

    free(){
        this.left = null;
        this.right = null;
    }
}

export default Nodemodel;