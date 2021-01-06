class Player {
    constructor (name, id, color, active = false) {
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.tokens = this.createTokens(21);
    }

    /**
     *  Creates token object for player.
     * @param {integer} num - Number of token objects to be created.
    */
    createTokens(num) {
        const tokens = [];

        for (let i = 0; i < num; i++) {
            let token = new Token(i, this);
            tokens.push(token);
        }
        return tokens
    }

    /**
     *  Get all the tokens that have not been used
     * @return {array} Array of unused tokens.
    */
    get unusedTokens() {
        return this.tokens.filter(token => !token.dropped);
    }

    /**
     *  Get the active Token by returning the first token in the arrayof unused tokens.
     * @return {object} first token object in the array of unused tokens
    */
    get activeToken() {
        return this.unusedTokens[0];
    }

    checkTokens() {
        return this.unusedTokens.length == 0 ? false : true;
    }
}