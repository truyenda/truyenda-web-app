import StringUtils from "./StringUtils";

export const toChapterLink = (comicTitle, chapterTitle, id) => {
  return "/chapters/"+id+'-' + StringUtils.convertToPath(comicTitle) + '-' +StringUtils.convertToPath(chapterTitle);
};

export const toComicLink = (title, id) => {
  return converter("comics",title, id);
};

export const toAuthorLink = (title, id) => {
  return converter("authors", title, id);
}

export const toComicReadLink = (title, id) => {
  return converter("comics/read", title, id);
}

export const toCategoryDetailLink = (title, id) => {
  return converter("categories", title, id);
} 

export const toComicDashboardLink = (title, id) => {
  return converter("dashboard/comics", title, id);
}

export const toTeamLink = (name, id) => {
    return converter('teams', name, id);
}

const converter = (prefix, name, id) => {
    return '/'+prefix+'/'+id+'-'+StringUtils.convertToPath(name);
}

export const getIdBySplitingPath = (url, prefix) => {
  return url.split(prefix)[1].split("-")[0];
}