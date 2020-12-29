
const anchor = (url, text) => {

    return `
        <a target="_blank" href=${url} class="text-white card-link">
            ${text}
        </a>
    `;
}

const body = children => {

    return `
        <div class="card-body">
            ${childrenToHtml(children)}
        </div>
    `;
}

const bold = text => {

    return `
        <b>${text}</b>
    `;
}

const card = children => {

    return `
        <div class="card mt-2 shadow bg-dark text-center">
            ${childrenToHtml(children)}
        </div>
    `;
}

const fontAwesome = icon => {

    return `
        <i class="fa fa-${icon}"></i>
    `;
}

const Footer = children => {
    
    return `
        <div class="card-footer">
            ${childrenToHtml(children)}
        </div>
    `;
}

const Header = () => {

    return `
        <div class="card-header">
            ${childrenToHtml(children)}
        </div>
    `;
}

const Image = src => {

    return `
        <img src="${src}" class="card-img-top" alt="plugin image" />
    `;
}

const List = children => {

    return `
        <ul class="list-group list-group-flush">
            ${childrenToHtml(children)}
        </ul>
    `;
}

const ListItem = item => {

    return `
        <a target="_blank" href="${item.url}" class="list-group-item list-group-item-action"> 
            ${item.text}
        </a>
    `;
}

const Paragraph = text => {

    return `
        <p class="card-text">
            ${text}
        </p>
    `;
}

const Table = () => {

    return `
        <div class="table-responsive">
            <table class="table table-borderless table-sm table-dark">
                <thead>
                    <tr>
                        ${children[0].getHead()}
                    </tr>
                </thead>
                <tbody>
                    ${childrenToHtml(children)}
                </tbody>
            </table>
        </div>
    `;
}

const TableItem = (item) => {
}

const Text = (text) => {
}

const Title = (text) => {
}