import "./css/main.scss";

import { MainModel } from "./MVC/model/mainModel";
import { MainView } from "./MVC/view/mainView";
import { MainController } from "./MVC/controller/mainController";

const controller = new MainController(new MainModel(), new MainView());
