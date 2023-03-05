import "./style.css";
import Canvas from "./engine/Engine";
import { $ } from "./engine/html";
import Player from "./components/Player";

const canvas = new Canvas({
    container: $("#app") as HTMLDivElement,
});

canvas.add(new Player());

canvas.core();
