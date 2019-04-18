import React, { Component } from "react";
import Manga from './Manga';
import styles from "./AllMangaCom.scss";
import Button from "../commonUI/Button";
import Caller from '../../utils/APICaller';
import LatestFilter from "../Manga/LatestFilter";
export default class AllMangaCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mangas: [
        {
          "Id": 49,
          "TenTruyen": "3 Manen no Kareshi",
          "AnhBia": "https://3.bp.blogspot.com/-xzrviQr4JcY/WaA-XjWXU2I/AAAAAAAMRbM/ELYlyAWb6S8hky2u7C_X4CEbtZAvMw8uACHMYCw/s0/3%E4%B8%87%E5%86%86%E3%81%AE%E5%BD%BC%E6%B0%8F_001.jpg",
          "TrangThai": "Đã hoàn thành",
          "TenTacGia": "MIO Junta"
        },
        {
          "Id": 50,
          "TenTruyen": "3 Manen no Kareshi",
          "AnhBia": "https://3.bp.blogspot.com/-xzrviQr4JcY/WaA-XjWXU2I/AAAAAAAMRbM/ELYlyAWb6S8hky2u7C_X4CEbtZAvMw8uACHMYCw/s0/3%E4%B8%87%E5%86%86%E3%81%AE%E5%BD%BC%E6%B0%8F_001.jpg",
          "TrangThai": "Đã hoàn thành",
          "TenTacGia": "MIO Junta"
        },
        {
          "Id": 51,
          "TenTruyen": "3 Manen no Kareshi",
          "AnhBia": "https://3.bp.blogspot.com/-xzrviQr4JcY/WaA-XjWXU2I/AAAAAAAMRbM/ELYlyAWb6S8hky2u7C_X4CEbtZAvMw8uACHMYCw/s0/3%E4%B8%87%E5%86%86%E3%81%AE%E5%BD%BC%E6%B0%8F_001.jpg",
          "TrangThai": "Đã hoàn thành",
          "TenTacGia": "MIO Junta"
        },
        {
          "Id": 51,
          "TenTruyen": "3 Manen no Kareshi",
          "AnhBia": "https://3.bp.blogspot.com/-xzrviQr4JcY/WaA-XjWXU2I/AAAAAAAMRbM/ELYlyAWb6S8hky2u7C_X4CEbtZAvMw8uACHMYCw/s0/3%E4%B8%87%E5%86%86%E3%81%AE%E5%BD%BC%E6%B0%8F_001.jpg",
          "TrangThai": "Đã hoàn thành",
          "TenTacGia": "MIO Junta"
        },
        {
          "Id": 51,
          "TenTruyen": "3 Manen no Kareshi",
          "AnhBia": "https://3.bp.blogspot.com/-xzrviQr4JcY/WaA-XjWXU2I/AAAAAAAMRbM/ELYlyAWb6S8hky2u7C_X4CEbtZAvMw8uACHMYCw/s0/3%E4%B8%87%E5%86%86%E3%81%AE%E5%BD%BC%E6%B0%8F_001.jpg",
          "TrangThai": "Đã hoàn thành",
          "TenTacGia": "MIO Junta"
        },
        {
          "Id": 51,
          "TenTruyen": "3 Manen no Kareshi",
          "AnhBia": "https://3.bp.blogspot.com/-xzrviQr4JcY/WaA-XjWXU2I/AAAAAAAMRbM/ELYlyAWb6S8hky2u7C_X4CEbtZAvMw8uACHMYCw/s0/3%E4%B8%87%E5%86%86%E3%81%AE%E5%BD%BC%E6%B0%8F_001.jpg",
          "TrangThai": "Đã hoàn thành",
          "TenTacGia": "MIO Junta"
        },
        {
          "Id": 51,
          "TenTruyen": "3 Manen no Kareshi",
          "AnhBia": "https://3.bp.blogspot.com/-xzrviQr4JcY/WaA-XjWXU2I/AAAAAAAMRbM/ELYlyAWb6S8hky2u7C_X4CEbtZAvMw8uACHMYCw/s0/3%E4%B8%87%E5%86%86%E3%81%AE%E5%BD%BC%E6%B0%8F_001.jpg",
          "TrangThai": "Đã hoàn thành",
          "TenTacGia": "MIO Junta"
        },
        {
          "Id": 51,
          "TenTruyen": "3 Manen no Kareshi",
          "AnhBia": "https://3.bp.blogspot.com/-xzrviQr4JcY/WaA-XjWXU2I/AAAAAAAMRbM/ELYlyAWb6S8hky2u7C_X4CEbtZAvMw8uACHMYCw/s0/3%E4%B8%87%E5%86%86%E3%81%AE%E5%BD%BC%E6%B0%8F_001.jpg",
          "TrangThai": "Đã hoàn thành",
          "TenTacGia": "MIO Junta"
        },
        {
          "Id": 51,
          "TenTruyen": "3 Manen no Kareshi",
          "AnhBia": "https://3.bp.blogspot.com/-xzrviQr4JcY/WaA-XjWXU2I/AAAAAAAMRbM/ELYlyAWb6S8hky2u7C_X4CEbtZAvMw8uACHMYCw/s0/3%E4%B8%87%E5%86%86%E3%81%AE%E5%BD%BC%E6%B0%8F_001.jpg",
          "TrangThai": "Đã hoàn thành",
          "TenTacGia": "MIO Junta"
        },
        {
          "Id": 51,
          "TenTruyen": "3 Manen no Kareshi",
          "AnhBia": "https://3.bp.blogspot.com/-xzrviQr4JcY/WaA-XjWXU2I/AAAAAAAMRbM/ELYlyAWb6S8hky2u7C_X4CEbtZAvMw8uACHMYCw/s0/3%E4%B8%87%E5%86%86%E3%81%AE%E5%BD%BC%E6%B0%8F_001.jpg",
          "TrangThai": "Đã hoàn thành",
          "TenTacGia": "MIO Junta"
        }
      ]
    };
  }
	render() {
    var elements_mangas = this.state.mangas.map((manga, index) => {
      return  <div key={ index }>
                <Manga
                  ten={manga.TenTruyen}
                  anhbia={manga.AnhBia}
                  trangthai={manga.TrangThai}
                  tacgia={manga.TenTacGia}
                />
              </div>

    });
		return (
      <div>
        <h1 className="title_all_manga">All Manga</h1>
        <LatestFilter />
        <div className="all_manga">
          {elements_mangas}
        </div>
      </div>           
		);
	}
}
