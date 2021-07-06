const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            { value: 1, name:`${'1.'.green} Buscar ciudad`},
            { value: 2, name:`${'2.'.green} Historial`},
            { value: 0, name:`${'0.'.green} Salir`}
        ]
    }
];

const inquirerMenu = async()=>{
    console.clear();
    console.log('======================'.green);
    console.log('Seleccione una opcion'.green);
    console.log('======================\n'.green);
    const{opcion} =  await inquirer.prompt(preguntas);
    return opcion;
};

const inquirerPausa = async()=>{
    const continuar ={
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar`,
    };
    console.log('\n');
    await inquirer.prompt(continuar);
};

const leerInput = async (message)=>{
    const question =[
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
};

const listadoLugares = async (lugares = [])=>{
    const choices = lugares.map((lugar,i)=>{
        const value = lugar.id;
        const name = `${i+1}.`.green;
        return {
            value,
            name : `${name} ${lugar.nombre}`
        };
    });
    choices.unshift({
       value: 0,
       name: '0.'.green + ' Cancelar'
    });
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: '\nSeleccione lugar?\n',
            choices
        }
    ];
    const {id} = await inquirer.prompt(questions);
    return id;
};

const confirmar = async (message)=>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
};

const mostrarListadoChecklist = async (tareas = [])=>{
    const choices = tareas.map((tarea,i)=>{
        const value = tarea.id;
        const name = `${i+1}.`.green;
        return {
            value,
            name : `${name} ${tarea.desc}`,
            checked: !!tarea.completadoEn
        };
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: '\nSeleccione\n',
            choices
        }
    ];
    const {ids} = await inquirer.prompt(question);
    return ids;
};

module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoLugares,
    confirmar,
    mostrarListadoChecklist
};