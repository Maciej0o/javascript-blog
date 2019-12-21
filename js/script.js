'use strict';

{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;


    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }


    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');

    }
    /* get 'href' attribute from the clicked link */

    const articleSelector =  clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };



  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(){

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';
    for( let article of articles){

      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* create HTML of the link */


      /* insert link into titleList */

      html = html + linkHTML;
    }
    titleList.innerHTML = html;
  }

  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');
  console.log('links', links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  function generateTags(){
  /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector)

  /* START LOOP: for every article: */
    for( let article of articles){
    /* find tags wrapper */
      const wrapperTags = article.querySelector(optArticleTagsSelector);
      console.log('wrapperTags', wrapperTags);
    /* make html variable with empty string */
      let html = '';
    /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('data-tags',articleTags);
    /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
      for( let tag of articleTagsArray){
        console.log('tag', tag);
      /* generate HTML of the link */
        const tagHTML = '<li><a href="#tag-' + tag +'">' + tag + ',</a></li>';
        console.log('tagHTML',  tagHTML);
      /* add generated code to html variable */
        html = html + tagHTML;
    /* END LOOP: for each tag */
      }
    /* insert HTML of all the links into the tags wrapper */
      wrapperTags.innerHTML = html;
  /* END LOOP: for every article: */
    }
  }

  generateTags();
}
