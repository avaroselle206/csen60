// Tags
const searchTags = [];

// Individual elements
let parentElement = null;
const tagLists = Array.from(document.querySelectorAll("article .tags"));

// Search Functions

/* 
This function takes users to an article based on the tags they add to the end of the URL (?tag=)
This function extracts "tag" parameters from the URL, assigns parentElement to newParentElement,
assuming it's not null, then calls addSearchTerm to display the correct article.
*/ 
function initializeSearch(newParentElement) {
    const params = new URLSearchParams(window.location.search);
    if (newParentElement === null) {
        console.error(
            "Cannot insert tags, parent element is null",
            params.getAll("tag")
        );
        return;
    }

    parentElement = newParentElement;
    for (const tag of params.getAll("tag")) {
        addSearchTerm(tag);
    }
console.log("initializeSearch function was called");
}

/*
This function checks to see if searchTags is empty, signifying that nothing needs to be hidden yet,
and removes everything hidden to make all articles visible. Then, it calls findArticlesWithTag() and
adds its returns to the array articlesWithTags. From there, a for loop is used to hide any of the
articles that don't include the specific article tag.
*/
function hideArticles() {
    if (searchTags.length === 0) {
        for (const article of document.querySelectorAll("article")) {
            article.classList.remove("hidden");
        }
        return;
    }

    const articlesWithTags = [];
    for (const tag of searchTags) {
        articlesWithTags.push(...findArticlesWithTag(tag));
    }

    /**
    * use querySelectorAll to select all articles
    * iterate over them in a for loop
    * check if articlesWithTags array does not include the current article being iterated over,
    * then add "hidden" to that article's classList
    * else, remove "hidden" from that article's classList
    */
    // write your code here
    for (const article of document.querySelectorAll("article")) {
        if (!articlesWithTags.includes(article)) {
            article.classList.add("hidden");
        } else {
            article.classList.remove("hidden");
        }
    }
console.log("hideArticles function was called");
}

/**
    * Creates a clickable tag button for a given search term (text). When clicked,
    * the button will remove the corresponding tag from both the DOM and the searchTags array.
    * This function also calls hideArticles to update the articles displayed after removal.
*/
function createTag(text) {
    /**
    * create a new element called button
    * add the class "tag" to its classList
    * set the button's textContent property to text (the passed in argument)
    */
    // write your code here
    const button = document.createElement("button");
    button.classList.add("tag");
    button.textContent = text;

    function remove() {
        button.remove();
        const index = searchTags.indexOf(text);
        if (index !== -1) {
            searchTags.splice(index, 1);
        }

        hideArticles();
    console.log("remove function was called");
    }

    /**
    * add a click event listener to the button, and set the listener to the remove function.
    * return the button element 
    */
    // write your code here
    button.addEventListener("click",remove);
    console.log("removed");
    return button;
}

/*
Searches for articles that contain the matching tag of the input (phrase). Phrases are converted
to lowercase, ensuring a case-sensitive match.
*/
function findArticlesWithTag(phrase) {
    const articles = [];
    const sanitizedPhrase = phrase.toLowerCase().trim();
    for (const tl of tagLists) {
        const tags = Array.from(tl.querySelectorAll("li"));
        for (const tag of tags) {
            if (tag.textContent.toLowerCase().trim() === sanitizedPhrase) {
                articles.push(tl.parentElement);
                break;
            }
        }
    }

    return articles;
}

/*
This function takes the input (text) and makes it visible. It is added to the parentElement,
calls createTag, added to searchTags, then calls hideArticles.
*/
function addSearchTerm(text) {
    parentElement.appendChild(createTag(text));
    searchTags.push(text);
    hideArticles();
console.log("addSearchTerm function was called");
}

// Handlers

/*
This function adds the input's value to the searchTerm, and empties the search bar.
*/
function onSearch(event) {
    const input = event.currentTarget;
    /**
    * If event.key equals "Enter":
    * call addSearchTerm and pass the input element's value
    * set input value to an empty string
    */
    // write your code here
    if (event.key === "Enter") {
    addSearchTerm(input.value);
    input.value = "";
    }
console.log("onSearch function was called");
}

// Main function

function main() {
    initializeSearch(document.querySelector("#searched-tags"));

    document
        .querySelector("input[type=search]")
        .addEventListener("keypress", onSearch);
}

// Execute main function
main();

/**
    * Order of execution for each event:
    * Pressing Enter: removed -> hideArticles -> addSearchTerm -> onSearch
    * Clicking to Remove a Tag: remove
    * Loading the Page: initializeSearch
*/