const Account = require("../models/Account");
const { ClientTransaction, SupplierTransaction } = require('../models/Transaction');
const Client = require('../models/Client');
const Supplier = require('../models/Supplier');

// Create a new account
exports.createAccount = async (req, res) => {
    try {
        const { accountNo, name, balance, accountType } = req.body;

        if (!accountNo || !name || !accountType) {
            return res.status(400).json({
                success: false,
                message: "Account number, name, and account type are required."
            });
        }

        // Check if account number is unique
        const existingAccount = await Account.findOne({ accountNo });
        if (existingAccount) {
            return res.status(400).json({
                success: false,
                message: "Account number already exists. Please choose a unique account number."
            });
        }

        // Create new account
        const newAccount = await Account.create({
            accountNo,
            name,
            balance: balance || 0.0,
            accountType,
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            account: newAccount,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating account.",
            error: error.message,
        });
    }
};

// Update account details
exports.updateAccount = async (req, res) => {
    try {
        const { accountId } = req.params;
        const { name, balance, accountType, sale, expense } = req.body;

        const updatedAccount = await Account.findByIdAndUpdate(
            accountId,
            { name, balance, accountType, sale, expense },
            { new: true, runValidators: true }
        );

        if (!updatedAccount) {
            return res.status(404).json({
                success: false,
                message: "Account not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Account updated successfully.",
            account: updatedAccount,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while updating account.",
            error: error.message,
        });
    }
};

// Delete an account by ID
exports.deleteAccount = async (req, res) => {
    try {
        const { accountId } = req.params;

        const deletedAccount = await Account.findByIdAndDelete(accountId);

        if (!deletedAccount) {
            return res.status(404).json({
                success: false,
                message: "Account not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting account.",
            error: error.message,
        });
    }
};

// create transaction
exports.createTransaction = async (req, res) => {
    try {
      const { careOf, toAccount, amount, transactionType, method, note, isClient } = req.body;
  
      let transaction;
      let careOfModel;
  
      // Create a new transaction based on whether it's for a Client or Supplier
      if (isClient) {
        // Create Client Transaction
        transaction = new ClientTransaction({
          careOf,
          toAccount,
          amount,
          transactionType,
          method,
          note,
        });
        
        await transaction.save();
  
        careOfModel = await Client.findById(careOf);
        if (!careOfModel) {
          return res.status(404).json({
            success: false,
            message: 'Client not found'
          });
        }
  
        careOfModel.transactions.push(transaction._id); // Push the transaction to the client
        await careOfModel.save();
  
        // Update the Account associated with this transaction for Client Transaction
        const account = await Account.findById(toAccount);
        if (!account) {
          return res.status(404).json({
            success: false,
            message: 'Account not found'
          });
        }
  
        account.clientTransactions.push(transaction._id); // Push to clientTransactions array
  
        // Update account's sale or expense value based on the transaction type
        if (transactionType === 'SALE') {
          account.sale += amount;
        } else if (transactionType === 'EXPENSE') {
          account.expense += amount;
        }
  
        await account.save();
  
      } else {
        // Create Supplier Transaction
        transaction = new SupplierTransaction({
          careOf,
          toAccount,
          amount,
          transactionType,
          method,
          note,
        });
  
        await transaction.save();
  
        careOfModel = await Supplier.findById(careOf);
        if (!careOfModel) {
          return res.status(404).json({
            success: false,
            message: 'Supplier not found'
          });
        }
  
        careOfModel.transactions.push(transaction._id); // Push the transaction to the supplier
        await careOfModel.save();
  
        // Update the Account associated with this transaction for Supplier Transaction
        const account = await Account.findById(toAccount);
        if (!account) {
          return res.status(404).json({
            success: false,
            message: 'Account not found'
          });
        }
  
        account.supplierTransactions.push(transaction._id); // Push to supplierTransactions array
  
        // Update account's sale or expense value based on the transaction type
        if (transactionType === 'SALE') {
          account.sale += amount;
        } else if (transactionType === 'EXPENSE') {
          account.expense += amount;
        }
  
        await account.save();
      }
  
      // Respond with success
      return res.status(201).json({
        success:true,
        message: 'Transaction created successfully',
        transaction,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ 
        success: false,
        message: 'Server error', 
        error 
      });
    }
  };
  

// Controller to get all accounts
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find()
                          .populate({
                            path:"clientTransactions",
                            populate:{
                              path:"careOf",
                              populate:{
                                path:"billingAddress",
                              }
                            }
                          })
                          .populate({
                            path:"supplierTransactions",
                            populate:{
                              path:"careOf"
                            }
                          })
                          .exec();
    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ 
        success:false,
        message: 'No accounts found' });
    }
    return res.status(200).json(
       { success:true,
        message:"Accounts fetched successfully",
        accounts
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
        success:false,
        message: 'Server error', error 
    });
  }
};

// Controller to get account details by ID
exports.getAccountById = async (req, res) => {
    try {
      const { accountId } = req.params;
  
      // Find the account by ID and populate both clientTransactions and supplierTransactions
      const account = await Account.findById(accountId)
        .populate('clientTransactions')  // Populate ClientTransactions
        .populate('supplierTransactions');  // Populate SupplierTransactions
  
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found',
        });
      }
  
      // Return the account details along with both client and supplier transactions
      return res.status(200).json({
        success: true,
        message: 'Account fetched successfully',
        account,
        clientTransactions: account?.clientTransactions,
        supplierTransactions: account?.supplierTransactions,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error,
      });
    }
  };
  