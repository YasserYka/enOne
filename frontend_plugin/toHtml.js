
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

const Bold = text => {

    return `
        <b>${text}</b>
    `;
}

const Card = (children) => {

    return `
        <div class="card mt-2 shadow bg-dark text-center">
            ${childrenToHtml(children)}
        </div>
    `;
}

const FontAwesome = (icon) => {
}

const Footer = () => {
}

const Header = () => {
}

const Image = (src) => {
}

const List = () => {
}

const ListItem = (item) => {
}

const Paragraph = (text) => {
}

const Table = () => {
}

const TableItem = (item) => {
}

const Text = (text) => {
}

const Title = (text) => {
}