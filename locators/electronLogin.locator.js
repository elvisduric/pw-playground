class ElectronLoginLocator {
    constructor(window) {
        this.window = window;
        this.ElectronPswd = 'input[name="password"]';
    }
}

module.exports = ElectronLoginLocator;