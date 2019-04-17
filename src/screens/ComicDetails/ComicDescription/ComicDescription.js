import React, { Component } from "react";
import styles from "./ComicDescription.scss";

export default class ComicDescription extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details
      };
   }
   render() {
      const { comic } = this.state;
      return (
         <div className="comic-description-container">
            <h2>Description</h2>
            <div className="comic-description-content">
               <p>
                  In his past life, although too weak to protect his home when
                  it counted, out of grave determination Nie Li became the
                  strongest Demon Spiritist and stood at the pinnacle of the
                  martial world. However, he lost his life during the battle
                  with the Sage Emperor and six deity-ranked beasts.
               </p>
               <p>
                  His soul was then brought back to when he was still 13 years
                  old. Although he's the weakest in his class with the lowest
                  talent, having only a red soul realm and a weak one at that,
                  with the aid of the vast knowledge which he accumulated from
                  his previous life, he decided to train faster than anyone
                  could expect. He also decided to help those who died nobly in
                  his previous life to train faster as welll.
               </p>
               <p>
                  He aims to protect the city from the coming future of being
                  devastated by demon beasts and the previous fate of ending up
                  destroyed. He aims to protect his lover, friends, family and
                  fellow citizens who died in the beast assault or its
                  aftermath. And he aims to destroy the so-called Sacred family
                  who arrogantly abandoned their duty and betrayed the city in
                  his past life.
               </p>
               <p>
                  He aims to protect the city from the coming future of being
                  devastated by demon beasts and the previous fate of ending up
                  destroyed. He aims to protect his lover, friends, family and
                  fellow citizens who died in the beast assault or its
                  aftermath. And he aims to destroy the so-called Sacred family
                  who arrogantly abandoned their duty and betrayed the city in
                  his past life.
               </p>
               <p>
                  He aims to protect the city from the coming future of being
                  devastated by demon beasts and the previous fate of ending up
                  destroyed. He aims to protect his lover, friends, family and
                  fellow citizens who died in the beast assault or its
                  aftermath. And he aims to destroy the so-called Sacred family
                  who arrogantly abandoned their duty and betrayed the city in
                  his past life.
               </p>
            </div>
            <h2>{comic.comicStatus}</h2>
            <div className="comic-description-show-more">
               <p>Show More</p>
            </div>
         </div>
      );
   }
}
