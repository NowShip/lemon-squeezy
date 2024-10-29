type Category = "subscription" | "one_time" | "lead_magnet" | "pwyw";
type Tax_Code = "saas" | "eservice" | "ebook";
type Status = "pending" | "draft" | "published";

export interface GetListAllProductsTypes {
  meta: {
    page: {
      currentPage: number;
      from: number;
      lastPage: number;
      perPage: number;
      to: number;
      total: number;
    };
  };
  jsonapi: {
    version: string;
  };
  links: {
    first: string;
    last: string;
  };
  data: Array<{
    type: string;
    id: string;
    attributes: {
      store_id: number;
      name: string;
      slug: string;
      description: string;
      status: Status;
      status_formatted: string;
      thumb_url: string | null;
      large_thumb_url: string | null;
      price: number;
      price_formatted: string;
      from_price: number;
      to_price: number;
      pay_what_you_want: boolean;
      buy_now_url: string;
      from_price_formatted: string;
      to_price_formatted: string;
      created_at: string;
      updated_at: string;
      test_mode: boolean;
    };
    relationships: {
      store: {
        links: {
          related: string;
          self: string;
        };
      };
      variants: {
        links: {
          related: string;
          self: string;
        };
      };
    };
    links: {
      self: string;
    };
  }>;
}

export interface GetAProductTypes {
  jsonapi: {
    version: string;
  };
  links: {
    self: string;
  };
  data: {
    type: string;
    id: string;
    attributes: {
      store_id: number;
      name: string;
      slug: string;
      description: string;
      status: Status;
      status_formatted: string;
      thumb_url: string | null;
      large_thumb_url: string | null;
      price: number;
      price_formatted: string;
      from_price: number;
      to_price: number;
      pay_what_you_want: boolean;
      buy_now_url: string;
      from_price_formatted: string;
      to_price_formatted: string;
      created_at: string;
      updated_at: string;
      test_mode: boolean;
    };
    relationships: {
      store: {
        links: {
          related: string;
          self: string;
        };
      };
      variants: {
        links: {
          related: string;
          self: string;
        };
      };
    };
    links: {
      self: string;
    };
  };
}

export interface GetListAllVariantsTypes {
  meta: {
    page: {
      currentPage: number;
      from: number;
      lastPage: number;
      perPage: number;
      to: number;
      total: number;
    };
  };
  jsonapi: {
    version: string;
  };
  links: {
    first: string;
    last: string;
  };
  data: Array<{
    type: string;
    id: string;
    attributes: {
      price: number;
      is_subscription: boolean;
      interval: string;
      interval_count: number;
      has_free_trial: boolean;
      trial_interval: string;
      trial_interval_count: number;
      pay_what_you_want: boolean;
      min_price: number;
      suggested_price: number;
      product_id: number;
      name: string;
      slug: string;
      description: string;
      links: { title: string; url: string }[];
      has_license_keys: boolean;
      license_activation_limit: number;
      is_license_limit_unlimited: boolean;
      license_length_value: number;
      license_length_unit: string;
      is_license_length_unlimited: boolean;
      sort: number;
      status: Status;
      status_formatted: string;
      created_at: string;
      updated_at: string;
      test_mode: boolean;
    };
    relationships: {
      product: {
        links: {
          related: string;
          self: string;
        };
      };
      files: {
        links: {
          related: string;
          self: string;
        };
      };
      "price-model": {
        links: {
          related: string;
          self: string;
        };
      };
    };
    links: {
      self: string;
    };
  }>;
}

export interface GetAllOrdersTypes {
  meta: {
    page: {
      currentPage: number;
      from: number;
      lastPage: number;
      perPage: number;
      to: number;
      total: number;
    };
  };
  jsonapi: {
    version: string;
  };
  links: {
    first: string;
    last: string;
  };
  data: {
    type: string; // "orders"
    id: string;
    attributes: {
      store_id: number;
      customer_id: number;
      identifier: string;
      order_number: number;
      user_name: string;
      user_email: string;
      currency: string;
      currency_rate: string;
      subtotal: number;
      setup_fee: number;
      discount_total: number;
      tax: number;
      total: number;
      subtotal_usd: number;
      setup_fee_usd: number;
      discount_total_usd: number;
      tax_usd: number;
      total_usd: number;
      tax_name: string;
      tax_rate: string;
      tax_inclusive: boolean;
      status: string;
      status_formatted: string;
      refunded: boolean;
      refunded_at: string | null;
      subtotal_formatted: string;
      setup_fee_formatted: string;
      discount_total_formatted: string;
      tax_formatted: string;
      total_formatted: string;
      first_order_item: {
        id: number;
        order_id: number;
        product_id: number;
        variant_id: number;
        product_name: string;
        variant_name: string;
        price: number;
        created_at: string;
        updated_at: string;
      };
    };
    relationships: {
      store: {
        links: {
          related: string;
          self: string;
        };
      };
      customer: {
        links: {
          related: string;
          self: string;
        };
      };
      "order-items": {
        links: {
          related: string;
          self: string;
        };
      };
      subscriptions: {
        links: {
          related: string;
          self: string;
        };
      };
      "license-keys": {
        links: {
          related: string;
          self: string;
        };
      };
      "discount-redemptions": {
        links: {
          related: string;
          self: string;
        };
      };
    };
    links: {
      self: string;
    };
  }[];
}

export interface LemonSqueezyFilesResponse {
  meta: {
    page: {
      currentPage: number;
      from: number;
      lastPage: number;
      perPage: number;
      to: number;
      total: number;
    };
  };
  jsonapi: {
    version: string;
  };
  links: {
    first: string;
    last: string;
  };
  data: {
    type: string; // "files"
    id: string;
    attributes: {
      variant_id: number;
      identifier: string;
      name: string;
      extension: string;
      download_url: string;
      size: number;
      size_formatted: string;
      version: string;
      sort: number;
      status: string; // e.g., "published"
      createdAt: string; // ISO date string
      updatedAt: string; // ISO date string
      test_mode: boolean;
    };
    relationships: {
      variant: {
        links: {
          related: string;
          self: string;
        };
      };
    };
    links: {
      self: string;
    };
  }[];
}
