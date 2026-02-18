export const PackageStructure = () => {
  return (
    <div id="structure" className="md:scroll-m-[130px] scroll-m-28">
      <h3 className="text-black text-2xl font-semibold mt-8 dark:text-white">
        DA LI SE KUPOVINOM PRVOG STANA OSLOBAĐAM POREZA NA PRENOS APSOLUTNIH PRAVA?
      </h3>

      <div className="rounded-md p-6 border border-border dark:border-darkborder mt-6 bg-white dark:bg-zinc-900">
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            <strong>Da.</strong> Kupovinom <strong>prvog stana</strong> moguće je
            ostvariti oslobađanje od poreza na prenos apsolutnih prava, ali samo
            ako su ispunjeni zakonom propisani uslovi.
          </p>

          <p>
            Ova poreska olakšica važi <strong>isključivo za staru gradnju</strong>,
            odnosno kada se stan kupuje od fizičkog lica. Kod kupovine
            novogradnje od investitora plaća se <strong>PDV</strong>, pa se porez
            na prenos apsolutnih prava ne primenjuje.
          </p>

          <div>
            <h4 className="text-lg font-semibold text-black dark:text-white mb-2">
              Koliko kvadrata je oslobođeno poreza?
            </h4>
            <ul className="list-disc ps-5 space-y-2">
              <li>
                Do <strong>40 m²</strong> za kupca prvog stana
              </li>
              <li>
                Dodatnih <strong>15 m² po članu domaćinstva</strong> koji nema
                nekretninu
              </li>
              <li>
                Ako je stan veći, porez se plaća samo na višak kvadrature
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-black dark:text-white mb-2">
              Ko ima pravo na oslobođenje?
            </h4>
            <ul className="list-disc ps-5 space-y-2">
              <li>Punoletni državljani Republike Srbije</li>
              <li>Sa prebivalištem u Srbiji u trenutku kupovine</li>
              <li>
                Kupac i članovi domaćinstva ranije nisu bili vlasnici ili
                suvlasnici stana ili kuće
              </li>
            </ul>
          </div>

          <div className="mt-4 p-4 rounded-md bg-green-50 dark:bg-green-900/20">
            <p className="font-medium text-green-800 dark:text-green-300">
              Zaključak: Ako kupuješ prvi stan i ispunjavaš propisane uslove,
              porez na prenos apsolutnih prava može biti u potpunosti ili
              delimično oslobođen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
