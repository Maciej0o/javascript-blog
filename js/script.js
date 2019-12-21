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
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post .post-author';

  function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    //console.log('customSelector', customSelector)
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    //console.log('articles', articles)
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
  //console.log('links', links);
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
      //console.log('wrapperTags', wrapperTags);
    /* make html variable with empty string */
      let html = '';
    /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      //console.log('data-tags',articleTags);
    /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
      for( let tag of articleTagsArray){
        //console.log('tag', tag);
      /* generate HTML of the link */
        const tagHTML = '<li><a href="#tag-' + tag +'">' + tag + '</a></li>';
        //console.log('tagHTML',  tagHTML);
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

  function tagClickHandler(event){
  /* prevent default action for this event */
    event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log('clickedElement', clickedElement)
  /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log('href', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag', tag);
  /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('activeTags', activeTags)
  /* START LOOP: for each active tag link */
    for( let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
    }
  /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = clickedElement.querySelectorAll('href');
    //console.log('tagLinks',tagLinks)
  /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks){
    /* add class active */
      tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

}

  function addClickListenersToTags(){
    /* find all links to tags */
      const links = document.querySelectorAll('.list-horizontal a')
    /* START LOOP: for each link */
      for( let link of links){
      /* add tagClickHandler as event listener for that link */
        link.addEventListener('click',tagClickHandler);
    /* END LOOP: for each link */
      }
   }

  addClickListenersToTags();


  function generateAuthors(){
    const articles = document.querySelectorAll(optArticleSelector)
    //console.log('articles', articles);
    for(let article of articles ){

      //console.log('articleAuthors', articleAuthors);

      const wrapperAuthors = article.querySelector(optArticleAuthorSelector)
      console.log('wrapperAuthor', wrapperAuthors)

      let html = '';

      const articleAuthors = article.getAttribute('data-author');

      const authorHTML = '<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>'

      html = html + authorHTML;

      wrapperAuthors.innerHTML = authorHTML;
      }
  }
  generateAuthors()

  function authorClickHandler(){

    event.preventDefault();
    const clickedElement = this;

    const href = clickedElement.getAttribute('href');
    //console.log('href', href);
    const author = href.replace('#author-', '');

    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    for( let activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active');
    }

    const authorLinks = clickedElement.querySelectorAll('a[href^="#author-' + author + '"]');

    for(let authorLink of authorLinks){

      authorLink.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors(){
    const authorLinks = document.querySelectorAll('.post-author a');

    for( let author of authorLinks){

      author.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();
}
