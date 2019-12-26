{
  'use strict';
  const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post .post-author',
    tagsListSelector: '.tags.list',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
    authorsListSelector: '.authors.list',
  };


  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    const articleSelector =  clickedElement.getAttribute('href');

    const targetArticle = document.querySelector(articleSelector);

    targetArticle.classList.add('active');
  };


  function generateTitleLinks(customSelector = ''){


    const titleList = document.querySelector(opt.titleListSelector);
    titleList.innerHTML = '';

    const articles = document.querySelectorAll(opt.articleSelector + customSelector);

    let html = '';
    for( let article of articles){

      const articleId = article.getAttribute('id');

      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      html = html + linkHTML;
    }
    titleList.innerHTML = html;
  }

  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  function calculateTagsParams(tags){
    const params = {
      max : 0,
      min : 999999
    };
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }
    return params;
  }

  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opt.cloudClassCount - 1) + 1);

    return(opt.cloudClassPrefix + classNumber);
  }

  function generateTags(){

    let allTags = {};

    const articles = document.querySelectorAll(opt.articleSelector);

    for( let article of articles){
      const wrapperTags = article.querySelector(opt.articleTagsSelector);

      let html = '';

      const articleTags = article.getAttribute('data-tags');

      const articleTagsArray = articleTags.split(' ');

      for( let tag of articleTagsArray){

        const linkHTML = '<li><a href="#tag-' + tag +'">' + tag + '</a></li>';

        html = html + linkHTML;

        if(!allTags.hasOwnProperty(tag)){
          allTags[tag] = 1;
        } else{
          allTags[tag]++;
        }
      }
      wrapperTags.innerHTML = html;
    }
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);

    let allTagsHTML = '';

    for(let tag in allTags){
      allTagsHTML +='<li><a class="' + calculateTagClass(allTags[tag],tagsParams) + '" href="#tag-' + tag + '">'+ tag + '</a></li>';
    }
    tagList.innerHTML = allTagsHTML;
  }

  generateTags();

  function tagClickHandler(event){
    event.preventDefault();

    const clickedElement = this;

    const href = clickedElement.getAttribute('href');

    const tag = href.replace('#tag-', '');

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    for( let activeTag of activeTags){

      activeTag.classList.remove('active');
    }

    const tagLinks = document.querySelectorAll('a[href^="#tag-' + tag + '"]');

    for(let tagLink of tagLinks){

      tagLink.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){

    const links = document.querySelectorAll('.list-horizontal a' + ',' + '.tags a');

    for( let link of links){

      link.addEventListener('click',tagClickHandler);
    }

  }
  addClickListenersToTags();


  function generateAuthors(){

    let allAuthors = {};

    const articles = document.querySelectorAll(opt.articleSelector);

    for(let article of articles ){

      const wrapperAuthors = article.querySelector(opt.articleAuthorSelector);

      let html = '';

      const articleAuthors = article.getAttribute('data-author');

      const authorHTML = '<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>';

      html = html + authorHTML;

      if(!allAuthors.hasOwnProperty(articleAuthors)){
        allAuthors[articleAuthors] = 1;

      } else{
        allAuthors[articleAuthors]++;
      }

      wrapperAuthors.innerHTML = authorHTML;
    }

    const authorList = document.querySelector(opt.authorsListSelector);
    let sidebarHTML = '';

    for(let author in allAuthors){

      const allAuthorsHTML = '<li><a href="#author-' + author + '"><span>' + author +' (' + allAuthors[author] + ')</span></a></li>';

      sidebarHTML = sidebarHTML + allAuthorsHTML;
    }
    authorList.innerHTML = sidebarHTML;


  }

  generateAuthors();

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
    const authorLinks = document.querySelectorAll('.post-author a' + ',' + '.authors a');

    for( let author of authorLinks){

      author.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();
}
