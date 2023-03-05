import "./style.css";
import Canvas from "./engine/Engine";
import { $ } from "./engine/html";
import Player from "./components/Player";
import EnemyManager from "./components/EnemyManager";

const canvas = new Canvas({
    container: $("#app") as HTMLDivElement,
});

canvas.add(new Player(), new EnemyManager());

canvas.core();
