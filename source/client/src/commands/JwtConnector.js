import store from '../store/store'


const innerContext = {
    host: "",
    refreshTokenApi: "/auth/refresh",
    loginApi: "/auth/login",
    registrationApi: "/auth/registration",
    logoutApi: "/auth/logout",
    updateApi: "/auth/update",
}

export default function JwtConnector(cors) {

    this.username = 'anonymous';
    this.accessToken = null;
    this.tokenHeader = null;
    this.authorized = false;
    this.cors = cors;
    this.expired = null;

    this.setCors = function (b) {
        this.cors = b;
    };

    this.auth = function () {
        let param;
        if (this.cors) param = { credentials: 'include' };
        else param = null;

        return new Promise((resolve, reject) => {

            fetch(innerContext.host + innerContext.refreshTokenApi, param)
                .then(r => {
                    if (r.status == 200) return r.json();
                    else resolve(false);
                })
                .then((r) => {

                    this.accessToken = r.message;
                    this.tokenHeader = 'Bearer ' + r.message;

                    let parts = this.accessToken.split(/\./);

                    let decodedPart1 = atob(parts[1]);

                    let decodedPart1Json = JSON.parse(decodedPart1)

                    this.username = decodedPart1Json.sub;
                    this.expired = decodedPart1Json.exp;
                    this.authorized = true;

                    if (this.username == 'admin') {
                        console.log('auth success');

                        resolve(true);
                    }
                    else resolve(false);

                })
                .catch(e => {
                    resolve(false);
                });
        })

    }

    this.fetch = function(url, param){

        param = param || {}
        if (this.cors) param = { credentials: 'include', ...param };

        if (this.authorized) {
            param.headers = param.headers || {};
            param.headers = { 'Authorization': this.tokenHeader, ...param.headers };
        }
        else {
            return fetch(url, param);
        }
        this.tempParam = param;
        this.tempUrl = url;
        

        if (this.expired && this.expired > Date.now() / 1000) {
            return fetch(url, param);
        } else {
            this.authorized = false;
            
            return new Promise((resolve, reject)=>{

                this.refresh()
                .then(r=>{
                    
                        param.headers = { ...param.headers, 'Authorization': this.tokenHeader  };
                        fetch(url, param).then(r=>resolve(r)).catch(e=>reject(e));
                })
                .catch(e=>reject(e))
                ;
            })
        }
    }

    this.refresh = function () {
        let param;
        if (this.cors) param = { credentials: 'include' };
        else param = null;

        return new Promise((resolve, reject) => {
            return fetch(innerContext.host + innerContext.refreshTokenApi, param)
                .then(r => {
                    if (r.status == 200) return r.json();
                    else resolve(false);
                })
                .then((r) => {

                    this.accessToken = r.message;
                    this.tokenHeader = 'Bearer ' + r.message;

                    let parts = this.accessToken.split(/\./);

                    let decodedPart1 = atob(parts[1]);

                    let decodedPart1Json = JSON.parse(decodedPart1)

                    this.username = decodedPart1Json.sub;
                    this.expired = decodedPart1Json.exp;
                    this.authorized = true;

                    console.log('[ Info: refresh success. ]');

                    resolve(true);
                })
        })
    }

    this.login = function (username, password) {
        return new Promise((resolve, reject) => {
            if (username && password) {
                let param = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `username=${username}&password=${password}`

                };

                if (this.cors) param = { credentials: 'include', ...param };

                if (this.authorized) {
                    param.headers = param.headers || {};
                    param.headers = { 'Authorization': this.tokenHeader, ...param.headers };
                }

                fetch(innerContext.host + innerContext.loginApi, param)
                    .then(r => {
                        if (r.status == 200) return r.json();
                        else resolve(false);
                    })
                    .then(r => {

                        this.accessToken = r.message;
                        this.tokenHeader = 'Bearer ' + r.message;

                        let parts = this.accessToken.split(/\./);

                        let decodedPart1 = atob(parts[1]);

                        let decodedPart1Json = JSON.parse(decodedPart1)

                        this.username = decodedPart1Json.sub;
                        this.expired = decodedPart1Json.exp;
                        this.authorized = true;

                        if (this.username == 'admin') {
                            console.log(`login success. Username: ${this.username}`);
                            store.dispatch({ type: 'SET_LOGIN', login: true });
                            resolve(true);
                        }
                        else resolve(false);
                    })
                    .catch((error) => {
                        resolve(false);
                    });

            }
            else resolve(false);
        })
    }

    this.registration = function (username, password) {
        if (username && password) {
            let param = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `username=${username}&password=${password}`

            };

            fetch(innerContext.host + innerContext.registrationApi, param)
                .then(r => {

                    if (r.status == 201) {

                        console.log(`registration success`);
                    }
                    else console.log('registration failed');

                })
                .catch((error) => {
                    console.log('network error');
                });
        }
    }

    this.logout = function () {
        if (!this.authorized) {
            console.log('error logout');
            return
        }

        let param = { method: 'GET' };
        if (this.cors) {
            param = { credentials: 'include', ...param };
        }

        return new Promise((resolve, reject) => {

            fetch(innerContext.host + innerContext.logoutApi, param)

                .then(r => {

                    if (r.status == 200) {

                        this.accessToken = null;
                        this.tokenHeader = null;
                        this.username = 'anonymous';
                        this.expired = null;
                        this.authorized = false;

                        console.log('logout success');

                        store.dispatch({ type: 'SET_LOGIN', login: false });

                        resolve(true);
                    }
                    resolve(false);

                })

                .catch((error) => {
                    resolve(false);
                });
        });

    }

    this.update = function (username, password, newPassword) {
        return new Promise((resolve, reject) => {
            if (username && password && newPassword) {
                let param = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `username=${username}&password=${password}&newPassword=${newPassword}`

                };

                if (this.cors) param = { credentials: 'include', ...param };

                if (this.authorized) {
                    param.headers = param.headers || {};
                    param.headers = { 'Authorization': this.tokenHeader, ...param.headers };
                }

                fetch(innerContext.host + innerContext.updateApi, param)
                    .then(r => {
                        if (r.status == 200) {
                            console.log('password changed successfully');
                            resolve(true);
                        }
                        else resolve(false);
                    })

                    .catch((error) => {
                        resolve(false);
                    });

            }
            else resolve(false);
        })
    }
}
