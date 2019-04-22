import StringUtils from "./StringUtils";

export const toChapterLink = (comicTitle, chapterTitle, id) => {
  return "/chapters/" + StringUtils.ConvertToPath(comicTitle) + '-' +StringUtils.ConvertToPath(chapterTitle) + "-" + id;
};

export const toComicLink = (title, id) => {
  return converter("comics",title, id);
};

export const toTeamLink = (name, id) => {
    return converter('teams', name, id);
}

const converter = (prefix, name, id) => {
    return '/'+prefix+'/'+StringUtils.ConvertToPath(name)+'-'+id;
}