
export const Apropos = () => {
    return (
        <div className="text-center bg-froly-300 rounded-lg  m-4 p-8 ">
            <h1 className="text-4xl font-bold font-froly-800 mb-4">À propos de ce projet</h1>
            <p className="text-md mb-2">
                Ce projet à été réalisé dans le cadre du travail de fin d'étude (TFE)de Maëlle Baudot, en formation de fullstack JavaScript developer à l'interface3.
            </p>

            <p className="text-md mb-2">
                L'objectif de ce site est de montrer les compétences acquises durant la formation, en réalisant une collection de mini-jeux et d'outils inspirés de l'univers d'Animal Crossing.
            </p>
            <p className="text-md mb-2">
                Le projet est réalisé en React, avec une API Node.js/Express pour la gestion des scores et des données. Les styles sont faits à la main, avec une touche de Tailwind CSS pour la rapidité.
            </p>
            <p className="text-md mb-2">
                N'hésitez pas à explorer les différentes fonctionnalités, et à me contacter si vous avez des questions ou des suggestions!
            </p>
        </div>
    );
};