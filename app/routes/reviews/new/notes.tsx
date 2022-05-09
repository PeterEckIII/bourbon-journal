import { Form, useOutletContext } from "@remix-run/react";
import { ActionFunction, json, redirect } from "@remix-run/server-runtime";
import EarthNotes from "~/components/Notes/EarthNotes/EarthNotes";
import FruitNotes from "~/components/Notes/FruitNotes/FruitNotes";
import GrainNotes from "~/components/Notes/GrainNotes/GrainNotes";
import SpiceNotes from "~/components/Notes/SpiceNotes/SpiceNotes";
import SweetNotes from "~/components/Notes/SweetNotes/SweetNotes";
import Rating from "~/components/Notes/Rating/Rating";
import type { ContextType } from "~/routes/reviews/new";

type ActionData = {
  errors?: {
    cherry: string;
    strawberry: string;
    raspberry: string;
    blackberry: string;
    blueberry: string;
    apple: string;
    banana: string;
    grape: string;
    stone: string;
    citrus: string;
    tropical: string;
    pepper: string;
    bakingSpice: string;
    cinnamon: string;
    herbal: string;
    mint: string;
    coffee: string;
    tobacco: string;
    leather: string;
    oak: string;
    toasted: string;
    smokey: string;
    peanut: string;
    almond: string;
    pecan: string;
    walnut: string;
    oily: string;
    floral: string;
    corn: string;
    rye: string;
    wheat: string;
    malt: string;
    dough: string;
    vanilla: string;
    caramel: string;
    molasses: string;
    butterscotch: string;
    honey: string;
    chocolate: string;
    toffee: string;
    sugar: string;
    overallRating?: string;
    value?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  // const formData = await request.formData();
  // // SPICE
  // const pepper = Number(formData.get("pepper")?.toString());
  // const bakingSpice = Number(formData.get("bakingSpice")?.toString());
  // const cinnamon = Number(formData.get("cinnamon")?.toString());
  // const herbal = Number(formData.get("herbal")?.toString());
  // const mint = Number(formData.get("mint")?.toString());

  // // FRUIT
  // const cherry = Number(formData.get("cherry")?.toString());
  // const strawberry = Number(formData.get("strawberry")?.toString());
  // const raspberry = Number(formData.get("raspberry")?.toString());
  // const blackberry = Number(formData.get("blackberry")?.toString());
  // const blueberry = Number(formData.get("blueberry")?.toString());
  // const apple = Number(formData.get("apple")?.toString());
  // const banana = Number(formData.get("banana")?.toString());
  // const grape = Number(formData.get("grape")?.toString());
  // const stone = Number(formData.get("stone")?.toString());
  // const citrus = Number(formData.get("citrus")?.toString());
  // const tropical = Number(formData.get("tropical")?.toString());

  // // EARTHY
  // const coffee = Number(formData.get("coffee")?.toString());
  // const tobacco = Number(formData.get("tobacco")?.toString());
  // const leather = Number(formData.get("leather")?.toString());
  // const oak = Number(formData.get("oak")?.toString());
  // const toasted = Number(formData.get("toasted")?.toString());
  // const smokey = Number(formData.get("smokey")?.toString());
  // const peanut = Number(formData.get("peanut")?.toString());
  // const almond = Number(formData.get("almond")?.toString());
  // const pecan = Number(formData.get("pecan")?.toString());
  // const walnut = Number(formData.get("walnut")?.toString());
  // const oily = Number(formData.get("oily")?.toString());
  // const floral = Number(formData.get("floral")?.toString());

  // // GRAIN
  // const corn = Number(formData.get("corn")?.toString());
  // const rye = Number(formData.get("rye")?.toString());
  // const wheat = Number(formData.get("wheat")?.toString());
  // const malt = Number(formData.get("malt")?.toString());
  // const dough = Number(formData.get("dough")?.toString());

  // const vanilla = Number(formData.get("vanilla")?.toString());
  // const caramel = Number(formData.get("caramel")?.toString());
  // const molasses = Number(formData.get("molasses")?.toString());
  // const butterscotch = Number(formData.get("butterscotch")?.toString());
  // const honey = Number(formData.get("honey")?.toString());
  // const chocolate = Number(formData.get("chocolate")?.toString());
  // const toffee = Number(formData.get("toffee")?.toString());
  // const sugar = Number(formData.get("sugar")?.toString());
  // const overallRating = Number(formData.get("overallRating")?.toString());
  // const value = Number(formData.get("value")?.toString());

  // if (
  //   typeof pepper !== "number" ||
  //   typeof bakingSpice !== "number" ||
  //   typeof cinnamon !== "number" ||
  //   typeof herbal !== "number" ||
  //   typeof mint !== "number" ||
  //   typeof cherry !== "number" ||
  //   typeof strawberry !== "number" ||
  //   typeof raspberry !== "number" ||
  //   typeof blackberry !== "number" ||
  //   typeof blueberry !== "number" ||
  //   typeof apple !== "number" ||
  //   typeof banana !== "number" ||
  //   typeof grape !== "number" ||
  //   typeof stone !== "number" ||
  //   typeof citrus !== "number" ||
  //   typeof tropical !== "number" ||
  //   typeof coffee !== "number" ||
  //   typeof tobacco !== "number" ||
  //   typeof leather !== "number" ||
  //   typeof oak !== "number" ||
  //   typeof toasted !== "number" ||
  //   typeof smokey !== "number" ||
  //   typeof peanut !== "number" ||
  //   typeof almond !== "number" ||
  //   typeof pecan !== "number" ||
  //   typeof walnut !== "number" ||
  //   typeof oily !== "number" ||
  //   typeof floral !== "number" ||
  //   typeof peanut !== "number" ||
  //   typeof corn !== "number" ||
  //   typeof rye !== "number" ||
  //   typeof wheat !== "number" ||
  //   typeof malt !== "number" ||
  //   typeof dough !== "number" ||
  //   typeof vanilla !== "number" ||
  //   typeof caramel !== "number" ||
  //   typeof molasses !== "number" ||
  //   typeof butterscotch !== "number" ||
  //   typeof honey !== "number" ||
  //   typeof chocolate !== "number" ||
  //   typeof toffee !== "number" ||
  //   typeof sugar !== "number" ||
  //   typeof overallRating !== "number" ||
  //   typeof value !== "number"
  // ) {
  //   return json(
  //     { errors: { message: "One of the values was not a number" } },
  //     { status: 400 }
  //   );
  // }
  return redirect(`/reviews/new/confirm`);
};

export default function NewNotesRoute() {
  const { state, stateSetter } = useOutletContext<ContextType>();

  if (state === undefined || !stateSetter) {
    throw new Error(`Error with the Outlet Context`);
  }

  return (
    <Form method="post">
      <SpiceNotes state={state} />
      <FruitNotes state={state} />
      <EarthNotes state={state} />
      <GrainNotes state={state} />
      <SweetNotes state={state} />
      <Rating state={state} />
      <div className="my-2 text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Review
        </button>
      </div>
    </Form>
  );
}
