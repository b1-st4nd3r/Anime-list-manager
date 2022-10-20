export function FetchLibrary(){
    let loading = false;
    let results = null;
    let chunks = [];

    async function progress() {
        loading = true;
        const url = "https://anime-manager-app.herokuapp.com/";
        // const url = "http://localhost:8000/";
        try{
            const res = await fetch(url)

            if(res.status>=200 && res.status<=300){
                results = await readBody(res)
                console.log(results)
                console.log("yoooooooooo")
                return JSON.parse(results);
            }else{
                console.log(res)
                console.log("yeaaaaaaaaaaaaaaa")
                throw new Error(res.statusText)
            }
        }catch(err){
          return err
        }finally{
            loading = false;
        }
    }

    async function readBody(res) {
        const reader = res.body.getReader();
        console.log("kakashiiiiiiiiiiiiiiiii")

        let recieved = 0;

        while(loading){
            const {done, value} = await reader.read();
            if(done){
                loading = false;
            }else{
                chunks.push(value);
                console.log(chunks)
                console.log("hatakeeeeeeeeeeeeeee")
            }
        }

        console.log("stage 1")
        let body = new Uint8Array(recieved);
        let position = 0;

        console.log(body)
        console.log("stage 2")
        for (let chunk of chunks) {
            console.log("stage 2.5");
            body.prototype.set(chunk, position);
            position += chunk.length;
            console.log("stage 2.5");
        }

        console.log("stage 3")
        return new TextDecoder('utf-8').decode(body);
    }

    return { progress }
}

