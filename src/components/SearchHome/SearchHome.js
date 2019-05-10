import React, { Component } from "react";
import ComicApi from "../../api/ComicApi";
import styles from "./SearchHome.scss";
import AsyncSelect from "react-select/lib/Async";
import { toComicLink } from "../../utils/LinkUtils";
import { components } from "react-select";
export default class SearchHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedComic: null
    };
  }

  getComic(key, callback) {
    if (key.length === 0) return null;
    ComicApi.search(key, 1).then(res => {
      let data = [];
      res.data.Data.listComic.forEach(comic => {
        data.push({ label: comic.TenTruyen, value: comic.Id });
      });
      callback(data);
    });
  }

  render() {
    return (
      <div className="search-home-container">
        <p>Tìm kiếm truyện</p>
        <AsyncSelect
          cacheOptions
          placeholder="Tìm kiếm..."
          loadOptions={(v, c) => {
            this.getComic(v, c);
          }}
          components={{ DropdownIndicator }}
          value={this.state.selectedComic}
          onChange={v => {
            this.setState({
              selectedComic: v.value
            });
            document.location.href = toComicLink(v.label, v.value);
          }}
        />
      </div>
    );
  }
}
const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <i className="fas fa-search" />
    </components.DropdownIndicator>
  );
};
