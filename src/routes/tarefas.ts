import {Router, Request, Response} from "express";
import { Tarefa } from "../models/tarefa";

const router = Router();

let tarefas: Tarefa[] = [
    {id:1, titulo: "Estudar Express", concluida:false},
    {id:2, titulo: "Estudar para a prova", concluida:false}
]

router.get("/tarefas", (req: Request, rest: Response) => {
    rest.send(tarefas);
});

router.get("/:id", (req: Request, rest: Response) => {
    const id = Number(req.params.id)

    const tarefa = tarefas.find(t => t.id == id);

    if(!tarefa){
        return rest.status(404).json({erro: "Tarefa não encontrada"});
    }

    rest.json(tarefa);
});

 router.post("/tarefas", (req: Request, res: Response) => {
    const {titulo} = req.body;
    const novaTarefa: Tarefa = {

        id: tarefas.length + 1,
        titulo: titulo,
        concluida: false
    }
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
    
})

router.put("/tarefas/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const tarefa = tarefas.find(t => t.id == id);

    if(!tarefa){
        return res.status(404).json({erro: "Tarefa não encontrada"});
    }

    const {titulo, concluida} = req.body;
    tarefa.titulo = titulo ?? tarefa.titulo,
    tarefa.concluida = concluida ?? tarefa.concluida

    res.json(tarefa);
});
router.delete("/tarefas/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    // Verifica se a tarefa existe antes de tentar deletar
    const tarefaExiste = tarefas.some(t => t.id === id);

    if (!tarefaExiste) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    // Filtra o array removendo o item selecionado
    tarefas = tarefas.filter(t => t.id !== id);

    // Retorna status 204 (No Content) para indicar sucesso sem corpo de resposta
    res.status(204).send();
});

export default router;