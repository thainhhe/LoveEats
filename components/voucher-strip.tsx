'use client';

import { vouchers } from '@/lib/data';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';

export function VoucherStrip() {
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Available Vouchers
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Save more with exclusive offers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vouchers.map((voucher) => (
            <Card
              key={voucher.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-2 border-dashed border-primary/20 hover:border-primary/40"
            >
              <CardContent className="p-4 md:p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{voucher.icon}</span>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                    {voucher.validity}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-foreground mb-1">
                  {voucher.discount}
                </h3>
                <p className="text-sm text-foreground font-semibold mb-2">
                  {voucher.title}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {voucher.description}
                </p>

                {/* Code Display */}
                <div className="bg-muted/50 border border-border rounded-lg p-2 mb-3 flex items-center justify-between">
                  <code className="text-xs font-mono font-semibold text-foreground">
                    {voucher.code}
                  </code>
                  <button
                    className="p-1 hover:bg-primary/20 rounded transition-colors"
                    onClick={() => handleCopyCode(voucher.code)}
                    title="Copy code"
                  >
                    <Copy className="w-3.5 h-3.5 text-primary" />
                  </button>
                </div>

                <Button className="w-full bg-primary hover:bg-accent text-white text-sm">
                  Use Code
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
