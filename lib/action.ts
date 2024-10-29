"use server";

import type {
  GetAllOrdersTypes,
  GetAProductTypes,
  GetListAllProductsTypes,
  GetListAllVariantsTypes,
  LemonSqueezyFilesResponse,
} from "./action.type";

export async function getListAllProducts(id?: string): Promise<{
  data: GetListAllProductsTypes;
  error: string | null;
  status: number;
}> {
  const storeId = id || process.env.LEMON_SQUEEZY_STORE_ID;

  try {
    const res = await fetch(
      `https://api.lemonsqueezy.com/v1/products${
        storeId ? `?filter[store_id]=${storeId}` : ""
      }`,
      {
        method: "GET",
        headers: {
          accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        },
        next: { revalidate: 60 },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        data: {} as GetListAllProductsTypes,
        error: data,
        status: res.status,
      };
    }

    return {
      data,
      error: null,
      status: res.status,
    };
  } catch (error: any) {
    return {
      data: {} as GetListAllProductsTypes,
      error: error || "An unknown error occurred",
      status: error.status || 500,
    };
  }
}

export async function getAProduct(id?: string): Promise<{
  data: GetAProductTypes;
  error: string | null;
  status: number;
}> {
  const productId = id || process.env.LEMON_SQUEEZY_PRODUCT_ID;

  try {
    const res = await fetch(
      `https://api.lemonsqueezy.com/v1/products/${productId}`,
      {
        method: "GET",
        headers: {
          accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        },
        next: { revalidate: 5 },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        data: {} as GetAProductTypes,
        error: data,
        status: res.status,
      };
    }

    return {
      data,
      error: null,
      status: res.status,
    };
  } catch (error: any) {
    return {
      data: {} as GetAProductTypes,
      error: error || "An unknown error occurred",
      status: error.status || 500,
    };
  }
}

export async function getListAllVariants(id?: string): Promise<{
  data: GetListAllVariantsTypes;
  error: string | null;
  status: number;
}> {
  const productId = id || process.env.LEMON_SQUEEZY_PRODUCT_ID;

  try {
    const res = await fetch(
      `https://api.lemonsqueezy.com/v1/variants${
        productId ? `?filter[product_id]=${productId}` : ""
      }`,
      {
        method: "GET",
        headers: {
          accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        },
        next: { revalidate: 5 },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        data: {} as GetListAllVariantsTypes,
        error: data,
        status: res.status,
      };
    }

    return {
      data,
      error: null,
      status: res.status,
    };
  } catch (error: any) {
    return {
      data: {} as GetListAllVariantsTypes,
      error: error || "An unknown error occurred",
      status: error.status || 500,
    };
  }
}

export async function getAllTheOrders(value: {
  email?: string;
  storeId?: string;
}): Promise<{
  data: GetAllOrdersTypes;
  error: string | null;
  status: number;
}> {
  const params = new URLSearchParams();

  if (value.email) {
    params.append("filter[user_email]", value.email);
  }

  params.append(
    "filter[store_id]",
    value.storeId || process.env.LEMON_SQUEEZY_STORE_ID || ""
  );

  try {
    const res = await fetch(
      `https://api.lemonsqueezy.com/v1/orders?${params.toString()}`,
      {
        method: "GET",
        headers: {
          accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        },
        next: { revalidate: 5 },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        data: {} as GetAllOrdersTypes,
        error: data,
        status: res.status,
      };
    }

    return {
      data,
      error: null,
      status: res.status,
    };
  } catch (error: any) {
    return {
      data: {} as GetAllOrdersTypes,
      error: error || "An unknown error occurred",
      status: error.status || 500,
    };
  }
}

export async function createCheckout(variantId: string): Promise<{
  data: string;
  error: string | null;
  status: number;
}> {
  try {
    const res = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          relationships: {
            store: {
              data: {
                type: "stores",
                id: process.env.LEMON_SQUEEZY_STORE_ID?.toString(),
              },
            },
            variant: {
              data: {
                type: "variants",
                id: variantId,
              },
            },
          },
        },
      }),
      next: { revalidate: 0 },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: "",
        error: data,
        status: res.status,
      };
    }

    return {
      data: data.data.attributes.url,
      error: null,
      status: res.status,
    };
  } catch (error: any) {
    return {
      data: "",
      error: error || "An unknown error occurred",
      status: error.status || 500,
    };
  }
}

export async function getFiles(variantId?: string): Promise<{
  data: LemonSqueezyFilesResponse;
  error: string | null;
  status: number;
}> {
  try {
    const res = await fetch(
      `https://api.lemonsqueezy.com/v1/files${
        variantId ? `?filter[variant_id]=${variantId}` : ""
      }`,
      {
        method: "GET",
        headers: {
          accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        data: {} as LemonSqueezyFilesResponse,
        error: data,
        status: res.status,
      };
    }

    return {
      data: data,
      error: null,
      status: res.status,
    };
  } catch (error: any) {
    return {
      data: {} as LemonSqueezyFilesResponse,
      error: error || "An unknown error occurred",
      status: error.status || 500,
    };
  }
}
