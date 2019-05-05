export default {
  save(idChapter, indexPage) {
    let localBookmark = JSON.parse(localStorage.getItem("autobookmark"));
    if (!localBookmark) {
      localBookmark = {};
    }
    localBookmark[idChapter + ""] = indexPage;
    localStorage.setItem("autobookmark", JSON.stringify(localBookmark));
  },
  get(idChapter) {
    let localBookmark = JSON.parse(localStorage.getItem("autobookmark"));
    if (!localBookmark) {
      return 0;
    }
    if (localBookmark[idChapter]) {
      return localBookmark[idChapter];
    }
    return 0;
  },
  remove(idChapter) {
    let localBookmark = JSON.parse(localStorage.getItem("autobookmark"));
    if (localBookmark[idChapter]) {
      delete localBookmark[idChapter];
      localStorage.setItem("autobookmark", JSON.stringify(localBookmark));
    }
  }
};
