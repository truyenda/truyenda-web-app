import StringUtils from "./StringUtils";

export const toChapterLink = (comicTitle, chapterTitle, id) => {
  return "/chapters/"+id+'-' + StringUtils.convertToPath(comicTitle) + '-' +StringUtils.convertToPath(chapterTitle);
};

export const toComicLink = (title, id) => {
  return converter("comics",title, id);
};

export const toTeamLink = (name, id) => {
    return converter('teams', name, id);
}

const converter = (prefix, name, id) => {
    return '/'+prefix+'/'+id+'-'+StringUtils.convertToPath(name);
}