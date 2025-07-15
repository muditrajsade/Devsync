import React, { useState } from "react";
import { useEffect } from "react";

const client_id = "Ov23liW5jvYePA3DwlAR";
function Home(){

    let [load,set_load] = useState(0);

    let [access_token,set_access_token] = useState('');
    let [repolink,set_repolink] = useState('');

    /*useEffect(()=>{

        async function call_proxy_server(k){

            let rg = await fetch('http://localhost:8000/github/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: k })
            });

            let rgr = await rg.json();

            set_access_token(rgr.accessToken);

            


        }

        const q = window.location.search;

        const urlp = new URLSearchParams(q);
        const codeparam = urlp.get("code");

        if(codeparam != null){

            set_load(1);

            call_proxy_server(codeparam);

            set_load(2);
            



            

        }





    },[]);*/

    /*async function createrepo(){
        set_load(1);

          const response = await fetch('https://api.github.com/user/repos', {
                method: 'POST',
                headers: {
                    Authorization: `token ${access_token}`,
                    Accept: 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                name: repolink,
                description: 'Created from my Electron app',
                private: false,
                }),
            });

        const data = await response.json();

        if (response.status === 201) {
            console.log('✅ Repository created:', data.html_url);
            set_load(3);
        } else {
            console.error('❌ Error creating repo:', data);
        }
    }*/


    /*function login_with_github(){
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + client_id);
    }*/

    async function initializereact_project() {

        console.log(repolink);
        

        try {
            const response = await fetch("http://13.235.78.135:8000/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ repoUrl:repolink }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log("✅ Success:", result.message);
                alert("React project initialized and pushed to GitHub!");
            } else {
                console.error("❌ Error:", result.error);
                alert("Failed: " + result.error);
            }
        } catch (err) {
                console.error("❌ Request Failed:", err.message);
                alert("Request failed. Check EC2 or network.");
        }
    }


    if(load == 3){
        return (
            <div>
                <p>SUCCESSFULL REPO CREATED</p>
            </div>
        );
    }

    if(load == 1){
        return(
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    if(load == 2){
        return (
            <div>

                <input type="text" value={repolink} onChange={(e)=>{set_repolink(e.target.value)}}  />

                <button onClick={initializereact_project}>
                    Create Repository
                </button>
            </div>
        );
    }
    return (
        <div>

            <button onClick={()=>{
                set_load(2);
            }} >React js</button>
            <button>Node js</button>
            <button>Flask</button>
            <button>Django</button>

        </div>
    );
}

export default Home;