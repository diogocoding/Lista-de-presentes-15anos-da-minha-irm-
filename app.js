const firebaseConfig = {
    apiKey: "porenquantonãovouporolinkparaevitarquepessoasdeforainterajamcomosite",
    authDomain: "porenquantonãovouporolinkparaevitarquepessoasdeforainterajamcomosite",
    databaseURL: "porenquantonãovouporolinkparaevitarquepessoasdeforainterajamcomosite",
    projectId: "porenquantonãovouporolinkparaevitarquepessoasdeforainterajamcomosite",
    storageBucket: "porenquantonãovouporolinkparaevitarquepessoasdeforainterajamcomosite",
    messagingSenderId: "porenquantonãovouporolinkparaevitarquepessoasdeforainterajamcomosite",
    appId: "porenquantonãovouporolinkparaevitarquepessoasdeforainterajamcomosite",
    measurementId: "porenquantonãovouporolinkparaevitarquepessoasdeforainterajamcomosite"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();


const listaDePresentesDiv = document.getElementById('lista-de-presentes');
const refPresentes = database.ref('presentes');

refPresentes.on('value', (snapshot) => {
    listaDePresentesDiv.innerHTML = ''; 
    const presentes = snapshot.val();

    for (let id in presentes) {
        const presente = presentes[id];
        const presenteDiv = document.createElement('div');
        presenteDiv.classList.add('presente');
        presenteDiv.dataset.presenteId = id; 
        let conteudo = `<h3>${presente.nome}</h3>`;

        if (presente.disponivel) {
            conteudo += `<button onclick="marcarPresente('${id}', this)">Quero dar este!</button>`;
        } else {
            presenteDiv.classList.add('presente-indisponivel');
            conteudo += `<p><strong>Presente já escolhido!</strong></p>`;
            conteudo += `<button disabled>Indisponível</button>`;
        }

        presenteDiv.innerHTML = conteudo;
        listaDePresentesDiv.appendChild(presenteDiv);
    }
});


function marcarPresente(id, buttonElement) {
    const nomeConvidado = prompt("Que legal! Por favor, digite seu nome:");
    if (nomeConvidado) {
       
        buttonElement.disabled = true;
        buttonElement.textContent = 'Reservando...';

        
        const presenteCard = buttonElement.closest('.presente');
        if (presenteCard) {
            presenteCard.style.transition = 'box-shadow 0.5s ease-out';
            presenteCard.style.boxShadow = '0 0 20px 5px var(--color-button-bg)';
            setTimeout(() => {
                presenteCard.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)'; 
            }, 1500);
        }

        database.ref('presentes/' + id).update({
            disponivel: false,
            dadoPor: nomeConvidado
        })
        .then(() => {
            
            console.log("Presente marcado com sucesso!");
        })
        .catch((error) => {
            console.error("Erro ao marcar presente:", error);
            alert("Ocorreu um erro ao marcar o presente. Tente novamente.");
            
            buttonElement.disabled = false;
            buttonElement.textContent = 'Quero dar este!';
        });
    }
}