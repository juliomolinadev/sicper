import { entidades } from "../data/entidades";

export const getEntidadesByUser = (entidadUser) => {
	return entidades.find((entidad) => entidad.id === entidadUser);
};
