import ScrollCategoryContextProvider from "@/components/contexts/ScrollCategoryContextProvider";
import { Container, Filters, ProductGroup, ToolBar } from "@/components/shared";

export default function Home() {
    return (
        <ScrollCategoryContextProvider>
            <main>
                <div className="h-[1px]"></div>
                <ToolBar />
                <Container className="flex gap-12 mt-7">
                    <Filters />
                    <div className="flex flex-col gap-24 pb-20">
                        <ProductGroup
                            categoryId={1}
                            title="Пиццы"
                            items={[
                                {
                                    id: 1,
                                    title: "Креветка и песто",
                                    imageUrl:
                                        "https://media.dodostatic.net/image/r:584x584/019591b642d87304a62d322945990861.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                                {
                                    id: 2,
                                    title: "Креветка и песто",
                                    imageUrl:
                                        "https://media.dodostatic.net/image/r:584x584/019591b642d87304a62d322945990861.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                                {
                                    id: 3,
                                    title: "Креветка и песто",
                                    imageUrl:
                                        "https://media.dodostatic.net/image/r:584x584/019591b642d87304a62d322945990861.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                                {
                                    id: 4,
                                    title: "Креветка и песто",
                                    imageUrl:
                                        "https://media.dodostatic.net/image/r:584x584/019591b642d87304a62d322945990861.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                                {
                                    id: 5,
                                    title: "Креветка и песто",
                                    imageUrl:
                                        "https://media.dodostatic.net/image/r:584x584/019591b642d87304a62d322945990861.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                                {
                                    id: 6,
                                    title: "Креветка и песто",
                                    imageUrl:
                                        "https://media.dodostatic.net/image/r:584x584/019591b642d87304a62d322945990861.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                            ]}
                            className="leading-[200%]"
                        />
                        <ProductGroup
                            categoryId={2}
                            title="Закуски"
                            items={[
                                {
                                    id: 1,
                                    title: "Дэнвич с говядиной",
                                    imageUrl:
                                        "	https://media.dodostatic.net/image/r:584x584/019591cfed20780b8ce864e05bc5e37b.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                                {
                                    id: 2,
                                    title: "Дэнвич с говядиной",
                                    imageUrl:
                                        "	https://media.dodostatic.net/image/r:584x584/019591cfed20780b8ce864e05bc5e37b.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                                {
                                    id: 3,
                                    title: "Дэнвич с говядиной",
                                    imageUrl:
                                        "	https://media.dodostatic.net/image/r:584x584/019591cfed20780b8ce864e05bc5e37b.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                                {
                                    id: 4,
                                    title: "Дэнвич с говядиной",
                                    imageUrl:
                                        "	https://media.dodostatic.net/image/r:584x584/019591cfed20780b8ce864e05bc5e37b.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                            ]}
                            className="leading-[200%]"
                        />
                        <ProductGroup
                            categoryId={3}
                            title="Десерты"
                            items={[
                                {
                                    id: 1,
                                    title: "Карамельный чизкейк",
                                    imageUrl:
                                        "	https://media.dodostatic.net/image/r:584x584/019592118e4076b486f441404702ef2b.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                                {
                                    id: 2,
                                    title: "Карамельный чизкейк",
                                    imageUrl:
                                        "	https://media.dodostatic.net/image/r:584x584/019592118e4076b486f441404702ef2b.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                                {
                                    id: 3,
                                    title: "Карамельный чизкейк",
                                    imageUrl:
                                        "	https://media.dodostatic.net/image/r:584x584/019592118e4076b486f441404702ef2b.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                                {
                                    id: 4,
                                    title: "Карамельный чизкейк",
                                    imageUrl:
                                        "	https://media.dodostatic.net/image/r:584x584/019592118e4076b486f441404702ef2b.avif",
                                    ingredients:
                                        "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок",
                                    price: 550,
                                },
                            ]}
                            className="leading-[200%]"
                        />
                    </div>
                </Container>
            </main>
        </ScrollCategoryContextProvider>
    );
}
